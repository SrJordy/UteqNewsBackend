import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { getFaculties, getCareers } from './uteqApi.service';

// sql.js usa CommonJS, importamos dinámicamente
let SQL: any = null;
let db: any = null;

// Configuración
const DB_PATH = path.join(__dirname, '../../data/vectors.db');
const FAQ_PATH = path.join(__dirname, '../../data/faq_carreras.json');
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.GOOGLE_API_KEY;

// Interfaz para FAQ
interface FaqItem {
    id: string;
    carrera: string;
    categoria: string;
    pregunta: string;
    respuesta: string;
}

// Cargar FAQ desde archivo JSON
const loadFaqData = (): FaqItem[] => {
    try {
        if (fs.existsSync(FAQ_PATH)) {
            const data = fs.readFileSync(FAQ_PATH, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('⚠️ Error cargando FAQ:', error);
    }
    return [];
};

// Inicializar base de datos
const initDatabase = async (): Promise<any> => {
    if (db) return db;

    // Importación dinámica de sql.js
    if (!SQL) {
        const initSqlJs = require('sql.js');
        SQL = await initSqlJs();
    }

    // Crear directorio si no existe
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Cargar BD existente o crear nueva
    if (fs.existsSync(DB_PATH)) {
        const buffer = fs.readFileSync(DB_PATH);
        db = new SQL.Database(buffer);
    } else {
        db = new SQL.Database();
    }

    // Crear tablas
    db.run(`
        CREATE TABLE IF NOT EXISTS vectors (
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL,
            type TEXT NOT NULL,
            embedding TEXT NOT NULL,
            metadata TEXT
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS metadata (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
    `);

    return db;
};

// Guardar base de datos a disco
const saveDatabase = (): void => {
    if (!db) return;
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
};

// Calcular hash de datos
const computeHash = (data: any): string => {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
};

// Generar embedding usando OpenRouter
const generateEmbedding = async (text: string): Promise<number[]> => {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/embeddings',
            {
                model: 'openai/text-embedding-3-small',
                input: text
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data?.data?.[0]?.embedding || [];
    } catch (error: any) {
        console.error('❌ Error generando embedding:', error.response?.data || error.message);
        return [];
    }
};

// Calcular similitud coseno
const cosineSimilarity = (a: number[], b: number[]): number => {
    if (a.length !== b.length || a.length === 0) return 0;
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
};

// Sincronizar vector store
export const syncVectorStore = async (): Promise<void> => {
    console.log('🔄 Sincronizando base de datos vectorial...');

    try {
        const database = await initDatabase();

        // 1. Obtener datos de APIs y FAQ
        const [faculties, careers] = await Promise.all([getFaculties(), getCareers()]);
        const faqData = loadFaqData();
        const allData = { faculties, careers, faq: faqData };

        // 2. Calcular hash
        const currentHash = computeHash(allData);

        // 3. Obtener hash almacenado
        const result = database.exec("SELECT value FROM metadata WHERE key = 'data_hash'");
        const storedHash = result.length > 0 ? result[0].values[0][0] : '';

        // 4. Si no hay cambios, salir
        if (currentHash === storedHash) {
            console.log('✅ Base de datos vectorial ya está actualizada.');
            return;
        }

        console.log('📝 Detectados cambios, regenerando embeddings...');

        // 5. Limpiar vectores
        database.run('DELETE FROM vectors');

        // 6. Procesar facultades
        console.log(`📚 Procesando ${faculties.length} facultades...`);
        for (const f of faculties) {
            const text = `Facultad: ${f.name}. Misión: ${f.mission || 'No disponible'}. Visión: ${f.vision || 'No disponible'}.`;
            const embedding = await generateEmbedding(text);
            if (embedding.length > 0) {
                database.run(
                    'INSERT INTO vectors (id, text, type, embedding, metadata) VALUES (?, ?, ?, ?, ?)',
                    [`faculty-${f.id}`, text, 'faculty', JSON.stringify(embedding), JSON.stringify(f)]
                );
            }
        }

        // 7. Procesar carreras
        console.log(`🎓 Procesando ${careers.length} carreras...`);
        for (const c of careers) {
            const text = `Carrera: ${c.name}. Descripción: ${c.description || 'No disponible'}. URL: ${c.careerUrl}.`;
            const embedding = await generateEmbedding(text);
            if (embedding.length > 0) {
                database.run(
                    'INSERT INTO vectors (id, text, type, embedding, metadata) VALUES (?, ?, ?, ?, ?)',
                    [`career-${c.name}`, text, 'career', JSON.stringify(embedding), JSON.stringify(c)]
                );
            }
        }

        // 8. Procesar FAQ de carreras
        console.log(`❓ Procesando ${faqData.length} preguntas frecuentes...`);
        for (const faq of faqData) {
            // Combinar pregunta y respuesta para mejor embedding
            const text = `[FAQ - ${faq.carrera.toUpperCase()}] Pregunta: ${faq.pregunta}. Respuesta: ${faq.respuesta}`;
            const embedding = await generateEmbedding(text);
            if (embedding.length > 0) {
                database.run(
                    'INSERT INTO vectors (id, text, type, embedding, metadata) VALUES (?, ?, ?, ?, ?)',
                    [faq.id, text, 'faq', JSON.stringify(embedding), JSON.stringify(faq)]
                );
            }
        }

        // 9. Guardar hash
        database.run("INSERT OR REPLACE INTO metadata (key, value) VALUES ('data_hash', ?)", [currentHash]);

        // 10. Guardar BD
        saveDatabase();

        const countResult = database.exec('SELECT COUNT(*) FROM vectors');
        const count = countResult.length > 0 ? countResult[0].values[0][0] : 0;
        console.log(`✅ Base de datos vectorial sincronizada con ${count} registros.`);

    } catch (error) {
        console.error('❌ Error sincronizando vector store:', error);
    }
};

// Buscar contexto relevante
export const searchContext = async (query: string, limit: number = 5): Promise<string> => {
    try {
        const database = await initDatabase();

        // 1. Generar embedding de la consulta
        const queryEmbedding = await generateEmbedding(query);
        if (queryEmbedding.length === 0) {
            console.warn('⚠️ No se pudo generar embedding para la consulta.');
            return '';
        }

        // 2. Obtener todos los vectores
        const result = database.exec('SELECT text, type, embedding, metadata FROM vectors');
        if (result.length === 0) return '';

        const rows = result[0].values.map((row: any) => ({
            text: row[0] as string,
            type: row[1] as string,
            embedding: JSON.parse(row[2] as string) as number[],
            metadata: JSON.parse(row[3] as string)
        }));

        // 3. Calcular similitudes
        const results = rows.map((row: any) => ({
            text: row.text,
            type: row.type,
            metadata: row.metadata,
            score: cosineSimilarity(queryEmbedding, row.embedding)
        }));

        // 4. Ordenar y tomar los más relevantes
        results.sort((a: any, b: any) => b.score - a.score);
        const topResults = results.slice(0, limit);

        // 5. Formatear contexto según el tipo
        const contextParts = topResults.map((r: any) => {
            if (r.type === 'faq') {
                // Para FAQ, solo devolver la respuesta directa
                return `[Pregunta Frecuente] ${r.metadata.respuesta}`;
            }
            return r.text;
        });

        return contextParts.join('\n\n');

    } catch (error) {
        console.error('❌ Error buscando contexto:', error);
        return '';
    }
};

// Inicializar al importar
console.log('🚀 Vector service cargado. Sincronizando en segundo plano...');
syncVectorStore().catch(err => console.error('Error en sincronización inicial:', err));
