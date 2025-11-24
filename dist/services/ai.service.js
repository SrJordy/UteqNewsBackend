"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = void 0;
const axios_1 = __importDefault(require("axios"));
const uteqApi_service_1 = require("./uteqApi.service");
const uteqApi_service_2 = require("./uteqApi.service");
// Asegúrate de que la API Key esté en tus variables de entorno
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY no está definida en las variables de entorno.');
}
/**
 * Pregunta a la IA sobre una entidad (carrera o facultad) específica.
 * @param type - Tipo de entidad ('career' o 'faculty').
 * @param name - Nombre de la carrera o facultad.
 * @param question - La pregunta del usuario.
 * @returns La respuesta de la IA.
 */
const askAI = async (type, name, question) => {
    let context = '';
    let entityData;
    // Construcción del contexto (se hace una sola vez)
    try {
        // Función auxiliar para distancia de Levenshtein (similitud de cadenas)
        const getLevenshteinDistance = (a, b) => {
            const matrix = [];
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) == a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    }
                    else {
                        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                    }
                }
            }
            return matrix[b.length][a.length];
        };
        // Función auxiliar para búsqueda difusa
        const findBestMatch = (target, items, key = 'name') => {
            if (!target || target === 'Universidad Técnica Estatal de Quevedo')
                return null;
            const targetLower = target.toLowerCase();
            // 1. Búsqueda exacta
            const exact = items.find(item => item[key].toLowerCase() === targetLower);
            if (exact)
                return exact;
            // 2. Búsqueda por inclusión (ej. "Software" en "Ingeniería de Software")
            const included = items.find(item => item[key].toLowerCase().includes(targetLower));
            if (included)
                return included;
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
            const careers = await (0, uteqApi_service_1.getCareers)();
            const entityData = findBestMatch(name, careers);
            if (entityData) {
                context = `Información sobre la carrera ${entityData.name}: Campo Ocupacional: ${entityData.description}. URL: ${entityData.careerUrl}.`;
            }
            else {
                // Si no se encuentra o el nombre es genérico, listar las carreras disponibles
                const careerList = careers.map(c => c.name).join(', ');
                context = `El usuario está preguntando sobre carreras pero no especificó una válida o no se encontró la carrera "${name}". 
                Lista de carreras disponibles en la UTEQ: ${careerList}. 
                Si el usuario pregunta "¿qué carreras hay?" o similar, muéstrale esta lista. 
                Si intentó buscar una carrera y no la encontraste, sugiere la más parecida de la lista.`;
            }
        }
        else if (type === 'faculty') {
            const faculties = await (0, uteqApi_service_2.getFaculties)();
            const entityData = findBestMatch(name, faculties);
            if (entityData) {
                context = `Información sobre la facultad ${entityData.name}: Misión: ${entityData.mission}. Visión: ${entityData.vision}. URL Video: ${entityData.videoUrl}. Facebook: ${entityData.facebookUrl}.`;
            }
            else {
                // Si no se encuentra o el nombre es genérico, listar las facultades disponibles
                const facultyList = faculties.map(f => f.name).join(', ');
                context = `El usuario está preguntando sobre facultades pero no especificó una válida o no se encontró la facultad "${name}". 
                Lista de facultades disponibles en la UTEQ: ${facultyList}. 
                Si el usuario pregunta "¿qué facultades hay?" o similar, muéstrale esta lista.
                Si intentó buscar una facultad y no la encontraste, sugiere la más parecida de la lista.`;
            }
        }
    }
    catch (error) {
        console.error("Error al obtener contexto de UTEQ API:", error);
        context = "No se pudo obtener información actualizada de la UTEQ en este momento.";
    }
    try {
        const prompt = `Eres un asistente de la Universidad Técnica Estatal de Quevedo (UTEQ). Responde preguntas sobre carreras y facultades basándote en la información proporcionada. Si la pregunta no está relacionada con la UTEQ o la información proporcionada, responde que no puedes ayudar con eso.
        
        Contexto Adicional: ${context}
        
        Pregunta del Usuario: ${question}`;
        console.log(`Consultando a Google Gemini (gemini-3-pro-preview) vía REST...`);
        const response = await axios_1.default.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent`, {
            contents: [{
                    parts: [{ text: prompt }]
                }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': GOOGLE_API_KEY
            }
        });
        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
            console.log(`Éxito con Gemini REST.`);
            return text;
        }
    }
    catch (error) {
        console.error(`Fallo con Google Gemini REST:`, error.response?.data || error.message || error);
        return "Lo siento, no pude conectar con el servicio de inteligencia de Google. Por favor verifica tu conexión o intenta más tarde.";
    }
    return "No se pudo generar una respuesta.";
};
exports.askAI = askAI;
