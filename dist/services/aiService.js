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
exports.testGroqModels = exports.askAI = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const vectorService_1 = require("./vectorService");
// Configuración de Groq
const GROQ_API_KEY = process.env.GROQ_API_KEY;
// Modelos gratuitos disponibles en Groq (ordenados por capacidad)
const GROQ_MODELS = {
    // Modelos más capaces
    LLAMA_70B: 'llama-3.3-70b-versatile', // Muy potente, más lento
    LLAMA_8B: 'llama-3.1-8b-instant', // Rápido y bueno
    GEMMA_9B: 'gemma2-9b-it', // Google Gemma 2
    MIXTRAL: 'mixtral-8x7b-32768', // Mixtral de Mistral
};
// Modelo por defecto para el chatbot
const DEFAULT_MODEL = GROQ_MODELS.LLAMA_70B;
if (!GROQ_API_KEY) {
    console.warn('⚠️ GROQ_API_KEY no está definida. El chat de IA no funcionará correctamente.');
}
// Inicializar cliente de Groq
const groq = new groq_sdk_1.default({
    apiKey: GROQ_API_KEY,
});
/**
 * Pregunta a la IA usando RAG (Búsqueda Vectorial) para el contexto.
 * @param question - La pregunta del usuario.
 * @returns La respuesta de la IA.
 */
const askAI = (question) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
        const systemPrompt = `Eres el asistente virtual EXCLUSIVO de la carrera de Ingeniería en Software de la UTEQ (Universidad Técnica Estatal de Quevedo).

REGLA MÁS IMPORTANTE - VERIFICA PRIMERO:
Antes de responder CUALQUIER pregunta, determina si está relacionada con:
- La carrera de Ingeniería en Software
- La UTEQ (Universidad Técnica Estatal de Quevedo)
- Materias, malla curricular, horarios, docentes de la carrera
- Programación, desarrollo de software, tecnología relacionada con la carrera
- Procesos académicos, inscripciones, requisitos de la carrera
- Eventos, clubes, actividades de la carrera o facultad

SI LA PREGUNTA NO ESTÁ RELACIONADA CON ESTOS TEMAS:
- NO respondas la pregunta
- Responde amablemente: "¡Hola! 👋 Soy el asistente de la carrera de Ingeniería en Software de la UTEQ. Solo puedo ayudarte con temas relacionados con nuestra carrera, la universidad, materias, malla curricular, programación y similares. ¿Tienes alguna pregunta sobre la carrera? 😊"

SI LA PREGUNTA SÍ ESTÁ RELACIONADA:
- Usa SOLO el CONTEXTO proporcionado para responder
- Si no hay información en el contexto, indica que no tienes esa información específica
- Sé amigable, usa emojis ocasionalmente
- Responde en español

CONTEXTO (RAG) - ÚNICA FUENTE DE INFORMACIÓN:
${context || 'No hay contexto específico disponible.'}`;
        console.log(`🤖 Consultando a Groq (${DEFAULT_MODEL})...`);
        const startTime = Date.now();
        const response = yield groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: question }
            ],
            model: DEFAULT_MODEL,
            temperature: 0.7,
            max_tokens: 1024,
        });
        const endTime = Date.now();
        console.log(`⚡ Respuesta recibida en ${endTime - startTime}ms`);
        const text = (_c = (_b = (_a = response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
        if (text) {
            return text.trim();
        }
    }
    catch (error) {
        console.error(`❌ Error con Groq:`, error.message);
        if (error.status === 401) {
            return 'Error de autenticación: Verifica tu GROQ_API_KEY.';
        }
        if (error.status === 429) {
            return 'Estoy un poco ocupado ahora mismo. ¿Puedes intentar de nuevo en unos segundos? 😅';
        }
        return 'Lo siento, tuve un problema técnico. ¿Puedes intentar de nuevo? 🔧';
    }
    return 'No pude generar una respuesta. ¿Puedes reformular tu pregunta?';
});
exports.askAI = askAI;
/**
 * Función de prueba para comparar modelos de Groq
 */
const testGroqModels = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (testQuestion = '¿Cuál es la malla curricular de Ingeniería en Software?') {
    var _a, _b, _c;
    console.log('\n🧪 === PRUEBA DE MODELOS GROQ ===\n');
    console.log(`📝 Pregunta de prueba: "${testQuestion}"\n`);
    const models = [
        { name: 'LLaMA 3.3 70B', id: GROQ_MODELS.LLAMA_70B },
        { name: 'LLaMA 3.1 8B', id: GROQ_MODELS.LLAMA_8B },
        { name: 'Gemma 2 9B', id: GROQ_MODELS.GEMMA_9B },
        { name: 'Mixtral 8x7B', id: GROQ_MODELS.MIXTRAL },
    ];
    for (const model of models) {
        console.log(`\n📊 Probando: ${model.name} (${model.id})`);
        console.log('-'.repeat(50));
        try {
            const startTime = Date.now();
            const response = yield groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un asistente de la carrera de Ingeniería en Software de la UTEQ. Responde de forma concisa en español.'
                    },
                    { role: 'user', content: testQuestion }
                ],
                model: model.id,
                temperature: 0.7,
                max_tokens: 512,
            });
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            const text = (_c = (_b = (_a = response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
            const tokens = response.usage;
            console.log(`⏱️  Tiempo: ${responseTime}ms`);
            console.log(`📊 Tokens: ${tokens === null || tokens === void 0 ? void 0 : tokens.prompt_tokens} entrada, ${tokens === null || tokens === void 0 ? void 0 : tokens.completion_tokens} salida`);
            console.log(`💬 Respuesta (primeros 200 chars):`);
            console.log(`   "${text === null || text === void 0 ? void 0 : text.substring(0, 200)}..."`);
        }
        catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }
    console.log('\n🏁 === FIN DE PRUEBAS ===\n');
});
exports.testGroqModels = testGroqModels;
