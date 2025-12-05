"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchContext = exports.syncVectorStore = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const uteqApi_service_1 = require("./uteqApi.service");
// sql.js usa CommonJS, importamos dinámicamente
let SQL = null;
let db = null;
// Configuración
const DB_PATH = path_1.default.join(__dirname, '../../data/vectors.db');
const FAQ_PATH = path_1.default.join(__dirname, '../../data/faq_carreras.json');
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.GOOGLE_API_KEY;
// Cargar FAQ desde archivo JSON
const loadFaqData = () => {
    try {
        if (fs_1.default.existsSync(FAQ_PATH)) {
            const data = fs_1.default.readFileSync(FAQ_PATH, 'utf-8');
            return JSON.parse(data);
        }
    }
    catch (error) {
        console.error('⚠️ Error cargando FAQ:', error);
    }
    return [];
};
// Inicializar base de datos
const initDatabase = async () => {
    if (db)
        return db;
    // Importación dinámica de sql.js
    if (!SQL) {
        const initSqlJs = require('sql.js');
        SQL = await initSqlJs();
    }
    // Crear directorio si no existe
    const dataDir = path_1.default.dirname(DB_PATH);
    if (!fs_1.default.existsSync(dataDir)) {
        fs_1.default.mkdirSync(dataDir, { recursive: true });
    }
    // Cargar BD existente o crear nueva
    if (fs_1.default.existsSync(DB_PATH)) {
        const buffer = fs_1.default.readFileSync(DB_PATH);
        db = new SQL.Database(buffer);
    }
    else {
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
const saveDatabase = () => {
    if (!db)
        return;
    const data = db.export();
    const buffer = Buffer.from(data);
    fs_1.default.writeFileSync(DB_PATH, buffer);
};
// Calcular hash de datos
const computeHash = (data) => {
    return crypto_1.default.createHash('sha256').update(JSON.stringify(data)).digest('hex');
};
// Generar embedding usando OpenRouter
const generateEmbedding = async (text) => {
    try {
        const response = await axios_1.default.post('https://openrouter.ai/api/v1/embeddings', {
            model: 'openai/text-embedding-3-small',
            input: text
        }, {
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data?.data?.[0]?.embedding || [];
    }
    catch (error) {
        console.error('❌ Error generando embedding:', error.response?.data || error.message);
        return [];
    }
};
// Calcular similitud coseno
const cosineSimilarity = (a, b) => {
    if (a.length !== b.length || a.length === 0)
        return 0;
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
};
// Sincronizar vector store
const syncVectorStore = async () => {
    console.log('🔄 Sincronizando base de datos vectorial...');
    try {
        const database = await initDatabase();
        // 1. Obtener datos de APIs y FAQ
        const [faculties, careers] = await Promise.all([(0, uteqApi_service_1.getFaculties)(), (0, uteqApi_service_1.getCareers)()]);
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
                database.run('INSERT INTO vectors (id, text, type, embedding, metadata) VALUES (?, ?, ?, ?, ?)', [`faculty-${f.id}`, text, 'faculty', JSON.stringify(embedding), JSON.stringify(f)]);
            }
        }
        // 7. Procesar carreras
        console.log(`🎓 Procesando ${careers.length} carreras...`);
        for (const c of careers) {
            const text = `Carrera: ${c.name}. Descripción: ${c.description || 'No disponible'}. URL: ${c.careerUrl}.`;
            const embedding = await generateEmbedding(text);
            if (embedding.length > 0) {
                database.run('INSERT INTO vectors (id, text, type, embedding, metadata) VALUES (?, ?, ?, ?, ?)', [`career-${c.name}`, text, 'career', JSON.stringify(embedding), JSON.stringify(c)]);
            }
        }
        // 8. Procesar FAQ de carreras
        console.log(`❓ Procesando ${faqData.length} preguntas frecuentes...`);
        for (const faq of faqData) {
            // Combinar pregunta y respuesta para mejor embedding
            const text = `[FAQ - ${faq.carrera.toUpperCase()}] Pregunta: ${faq.pregunta}. Respuesta: ${faq.respuesta}`;
            const embedding = await generateEmbedding(text);
            if (embedding.length > 0) {
                database.run('INSERT INTO vectors (id, text, type, embedding, metadata) VALUES (?, ?, ?, ?, ?)', [faq.id, text, 'faq', JSON.stringify(embedding), JSON.stringify(faq)]);
            }
        }
        // 9. Guardar hash
        database.run("INSERT OR REPLACE INTO metadata (key, value) VALUES ('data_hash', ?)", [currentHash]);
        // 10. Guardar BD
        saveDatabase();
        const countResult = database.exec('SELECT COUNT(*) FROM vectors');
        const count = countResult.length > 0 ? countResult[0].values[0][0] : 0;
        console.log(`✅ Base de datos vectorial sincronizada con ${count} registros.`);
    }
    catch (error) {
        console.error('❌ Error sincronizando vector store:', error);
    }
};
exports.syncVectorStore = syncVectorStore;
// Buscar contexto relevante
const searchContext = async (query, limit = 5) => {
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
        if (result.length === 0)
            return '';
        const rows = result[0].values.map((row) => ({
            text: row[0],
            type: row[1],
            embedding: JSON.parse(row[2]),
            metadata: JSON.parse(row[3])
        }));
        // 3. Calcular similitudes
        const results = rows.map((row) => ({
            text: row.text,
            type: row.type,
            metadata: row.metadata,
            score: cosineSimilarity(queryEmbedding, row.embedding)
        }));
        // 4. Ordenar y tomar los más relevantes
        results.sort((a, b) => b.score - a.score);
        const topResults = results.slice(0, limit);
        // 5. Formatear contexto según el tipo
        const contextParts = topResults.map((r) => {
            if (r.type === 'faq') {
                // Para FAQ, solo devolver la respuesta directa
                return `[Pregunta Frecuente] ${r.metadata.respuesta}`;
            }
            return r.text;
        });
        return contextParts.join('\n\n');
    }
    catch (error) {
        console.error('❌ Error buscando contexto:', error);
        return '';
    }
};
exports.searchContext = searchContext;
// Inicializar al importar
console.log('🚀 Vector service cargado. Sincronizando en segundo plano...');
(0, exports.syncVectorStore)().catch(err => console.error('Error en sincronización inicial:', err));
