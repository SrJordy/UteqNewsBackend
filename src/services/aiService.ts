import Groq from 'groq-sdk';
import { searchContext } from './vectorService';

// Configuración de Groq
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Modelos gratuitos disponibles en Groq (ordenados por capacidad)
const GROQ_MODELS = {
    // Modelos más capaces
    LLAMA_70B: 'llama-3.3-70b-versatile',      // Muy potente, más lento
    LLAMA_8B: 'llama-3.1-8b-instant',           // Rápido y bueno
    GEMMA_9B: 'gemma2-9b-it',                   // Google Gemma 2
    MIXTRAL: 'mixtral-8x7b-32768',              // Mixtral de Mistral
};

// Modelo por defecto para el chatbot
const DEFAULT_MODEL = GROQ_MODELS.LLAMA_70B;

if (!GROQ_API_KEY) {
    console.warn('⚠️ GROQ_API_KEY no está definida. El chat de IA no funcionará correctamente.');
}

// Inicializar cliente de Groq
const groq = new Groq({
    apiKey: GROQ_API_KEY,
});

/**
 * Pregunta a la IA usando RAG (Búsqueda Vectorial) para el contexto.
 * @param question - La pregunta del usuario.
 * @returns La respuesta de la IA.
 */
export const askAI = async (question: string): Promise<string> => {
    let context = '';

    try {
        // 1. Obtener contexto relevante usando búsqueda vectorial
        console.log(`🔍 Buscando contexto para: "${question}"...`);
        context = await searchContext(question, 3);
        console.log(`📚 Contexto encontrado: ${context.length > 0 ? 'Sí' : 'No'}`);
    } catch (error) {
        console.error('❌ Error al obtener contexto vectorial:', error);
        context = 'No se pudo obtener información detallada en este momento.';
    }

    try {
        const systemPrompt = `Eres el asistente virtual de la carrera de Ingeniería en Software de la UTEQ (Universidad Técnica Estatal de Quevedo).

PERSONALIDAD:
- Eres amigable, cercano y hablas de tú a tú con los estudiantes
- Usas un tono casual pero profesional
- Puedes usar emojis ocasionalmente para hacer la conversación más amena

INSTRUCCIONES:
1. Responde DIRECTAMENTE a la pregunta del usuario basándote en el CONTEXTO proporcionado
2. Tu respuesta debe ser en ESPAÑOL
3. Si no encuentras información en el contexto pero es una pregunta general sobre la carrera o la universidad, responde con tu conocimiento general
4. Si la pregunta no tiene relación con la UTEQ, la carrera de software o temas académicos, amablemente indica que estás especializado en esos temas
5. Sé conciso pero útil - no te extiendas innecesariamente

CONTEXTO (RAG):
${context || 'No hay contexto específico disponible.'}`;

        console.log(`🤖 Consultando a Groq (${DEFAULT_MODEL})...`);
        const startTime = Date.now();

        const response = await groq.chat.completions.create({
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

        const text = response.choices?.[0]?.message?.content;

        if (text) {
            return text.trim();
        }
    } catch (error: any) {
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
};

/**
 * Función de prueba para comparar modelos de Groq
 */
export const testGroqModels = async (testQuestion: string = '¿Cuál es la malla curricular de Ingeniería en Software?') => {
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

            const response = await groq.chat.completions.create({
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
            const text = response.choices?.[0]?.message?.content;
            const tokens = response.usage;

            console.log(`⏱️  Tiempo: ${responseTime}ms`);
            console.log(`📊 Tokens: ${tokens?.prompt_tokens} entrada, ${tokens?.completion_tokens} salida`);
            console.log(`💬 Respuesta (primeros 200 chars):`);
            console.log(`   "${text?.substring(0, 200)}..."`);

        } catch (error: any) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    console.log('\n🏁 === FIN DE PRUEBAS ===\n');
};