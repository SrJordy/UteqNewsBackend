import axios from 'axios';
import { getCareers } from './uteqApi.service';
import { getFaculties } from './uteqApi.service';

// Configuración de OpenRouter
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.GOOGLE_API_KEY; // Fallback por si el usuario usa la misma variable
const SITE_URL = 'https://uteq.edu.ec';
const APP_NAME = 'UTEQ News App';

if (!OPENROUTER_API_KEY) {
    console.warn('ADVERTENCIA: OPENROUTER_API_KEY no está definida. El chat de IA no funcionará correctamente.');
}

/**
 * Pregunta a la IA sobre una entidad (carrera o facultad) específica.
 * @param type - Tipo de entidad ('career' o 'faculty').
 * @param name - Nombre de la carrera o facultad (opcional).
 * @param question - La pregunta del usuario.
 * @returns La respuesta de la IA.
 */
export const askAI = async (type: 'career' | 'faculty', name: string | undefined, question: string): Promise<string> => {
    let context = '';

    // Construcción del contexto (se hace una sola vez)
    try {
        // Función auxiliar para distancia de Levenshtein (similitud de cadenas)
        const getLevenshteinDistance = (a: string, b: string): number => {
            const matrix = [];
            for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
            for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) == a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                    }
                }
            }
            return matrix[b.length][a.length];
        };

        // Función auxiliar para búsqueda difusa
        const findBestMatch = (target: string, items: any[], key: string = 'name') => {
            if (!target || target === 'Universidad Técnica Estatal de Quevedo') return null;
            const targetLower = target.toLowerCase();

            // 1. Búsqueda exacta
            const exact = items.find(item => item[key].toLowerCase() === targetLower);
            if (exact) return exact;

            // 2. Búsqueda por inclusión (ej. "Software" en "Ingeniería de Software")
            const included = items.find(item => item[key].toLowerCase().includes(targetLower));
            if (included) return included;

            // 3. Búsqueda por similitud (Levenshtein)
            let bestMatch = null;
            let minDistance = Infinity;

            for (const item of items) {
                const itemValue = item[key].toLowerCase();
                const distance = getLevenshteinDistance(targetLower, itemValue);
                // Umbral de similitud: permitir hasta 3 errores o 20% de la longitud
                const threshold = Math.max(3, Math.floor(itemValue.length * 0.2));

                if (distance < minDistance && distance <= threshold) {
                    minDistance = distance;
                    bestMatch = item;
                }
            }

            return bestMatch;
        };

        if (type === 'career') {
            const careers = await getCareers();
            // Si hay nombre, buscar por nombre. Si no, buscar en la pregunta.
            const targetName = name && name.trim().length > 0 ? name : question;
            const entityData = findBestMatch(targetName, careers);

            if (entityData) {
                context = `Información sobre la carrera ${entityData.name}: Campo Ocupacional: ${entityData.description}. URL: ${entityData.careerUrl}.`;
            } else {
                // Si no se encuentra o el nombre es genérico, listar las carreras disponibles
                const careerList = careers.map(c => c.name).join(', ');
                context = `El usuario está preguntando sobre carreras pero no se especificó una válida o no se encontró coincidencia para "${targetName}". 
                Lista de carreras disponibles en la UTEQ: ${careerList}. 
                Si el usuario pregunta "¿qué carreras hay?" o similar, muéstrale esta lista. 
                Si intentó buscar una carrera y no la encontraste, sugiere la más parecida de la lista.`;
            }
        } else if (type === 'faculty') {
            const faculties = await getFaculties();
            // Si hay nombre, buscar por nombre. Si no, buscar en la pregunta.
            const targetName = name && name.trim().length > 0 ? name : question;
            const entityData = findBestMatch(targetName, faculties);

            if (entityData) {
                context = `Información sobre la facultad ${entityData.name}: Misión: ${entityData.mission}. Visión: ${entityData.vision}. URL Video: ${entityData.videoUrl}. Facebook: ${entityData.facebookUrl}.`;
            } else {
                // Si no se encuentra o el nombre es genérico, listar las facultades disponibles
                const facultyList = faculties.map(f => f.name).join(', ');
                context = `El usuario está preguntando sobre facultades pero no se especificó una válida o no se encontró coincidencia para "${targetName}". 
                Lista de facultades disponibles en la UTEQ: ${facultyList}. 
                Si el usuario pregunta "¿qué facultades hay?" o similar, muéstrale esta lista.
                Si intentó buscar una facultad y no la encontraste, sugiere la más parecida de la lista.`;
            }
        }
    } catch (error) {
        console.error("Error al obtener contexto de UTEQ API:", error);
        context = "No se pudo obtener información actualizada de la UTEQ en este momento.";
    }

    try {
        const prompt = `Eres un asistente de la Universidad Técnica Estatal de Quevedo (UTEQ). Responde preguntas sobre carreras y facultades basándote en la información proporcionada. 
        IMPORTANTE: TODAS tus respuestas deben ser estrictamente en ESPAÑOL.
        Si la pregunta no está relacionada con la UTEQ o la información proporcionada, responde que no puedes ayudar con eso.
        
        Contexto Adicional: ${context}
        
        Pregunta del Usuario: ${question}`;

        console.log(`Consultando a OpenRouter (tngtech/deepseek-r1t-chimera:free)...`);

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'tngtech/deepseek-r1t-chimera:free',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': SITE_URL,
                    'X-Title': APP_NAME,
                    'Content-Type': 'application/json'
                }
            }
        );

        const text = response.data?.choices?.[0]?.message?.content;

        if (text) {
            console.log(`Éxito con OpenRouter.`);
            return text;
        }
    } catch (error: any) {
        console.error(`Fallo con OpenRouter:`, error.response?.data || error.message || error);

        if (error.response?.status === 401) {
            return "Error de autenticación: Verifica tu OPENROUTER_API_KEY.";
        }

        return "Lo siento, no pude conectar con el servicio de inteligencia. Por favor intenta más tarde.";
    }

    return "No se pudo generar una respuesta.";
};