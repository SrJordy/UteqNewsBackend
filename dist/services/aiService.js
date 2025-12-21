"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = void 0;
const axios_1 = __importDefault(require("axios"));
const vectorService_1 = require("./vectorService");
// Configuración de OpenRouter
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.GOOGLE_API_KEY;
const SITE_URL = 'https://uteq.edu.ec';
const APP_NAME = 'PreSoft - Carrera de Software UTEQ';
if (!OPENROUTER_API_KEY) {
    console.warn('⚠️ OPENROUTER_API_KEY no está definida. El chat de IA no funcionará correctamente.');
}
/**
 * Pregunta a la IA usando RAG (Búsqueda Vectorial) para el contexto.
 * @param question - La pregunta del usuario.
 * @returns La respuesta de la IA.
 */
const askAI = (question) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    let context = '';
    try {
        // 1. Obtener contexto relevante usando búsqueda vectorial
        console.log(`🔍 Buscando contexto para: "${question}"...`);
        context = yield (0, vectorService_1.searchContext)(question, 3);
        console.log(`📚 Contexto encontrado: ${context.length > 0 ? 'Sí' : 'No'}`);
    }
    catch (error) {
        console.error('❌ Error al obtener contexto vectorial:', error);
        context = 'No se pudo obtener información detallada en este momento.';
    }
    try {
        const prompt = `Eres un asistente de la Universidad Técnica Estatal de Quevedo (UTEQ).

INSTRUCCIONES:
1. Responde DIRECTAMENTE a la pregunta del usuario basándote en el CONTEXTO proporcionado.
2. Tu respuesta debe ser en ESPAÑOL.
3. Encierra tu respuesta final dentro de las etiquetas <respuesta> y </respuesta>.
4. Si no encuentras información relevante en el contexto, indica que no tienes esa información.

CONTEXTO (RAG):
${context || 'No hay contexto disponible.'}

PREGUNTA DEL USUARIO: ${question}`;
        console.log(`🤖 Consultando a OpenRouter...`);
        const response = yield axios_1.default.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'tngtech/deepseek-r1t-chimera:free',
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': SITE_URL,
                'X-Title': APP_NAME,
                'Content-Type': 'application/json'
            }
        });
        let text = (_d = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content;
        if (text) {
            // Extraer contenido de <respuesta>
            const match = text.match(/<respuesta>([\s\S]*?)<\/respuesta>/i);
            if (match && match[1]) {
                return match[1].trim();
            }
            // Fallback: limpiar tags <think>
            text = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
            return text;
        }
    }
    catch (error) {
        console.error(`❌ Fallo con OpenRouter:`, ((_e = error.response) === null || _e === void 0 ? void 0 : _e.data) || error.message);
        if (((_f = error.response) === null || _f === void 0 ? void 0 : _f.status) === 401) {
            return 'Error de autenticación: Verifica tu OPENROUTER_API_KEY.';
        }
        return 'Lo siento, no pude conectar con el servicio de inteligencia. Por favor intenta más tarde.';
    }
    return 'No se pudo generar una respuesta.';
});
exports.askAI = askAI;
