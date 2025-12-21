import axios from 'axios';
import { searchContext } from './vectorService';

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

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'tngtech/deepseek-r1t-chimera:free',
                messages: [{ role: 'user', content: prompt }]
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

        let text = response.data?.choices?.[0]?.message?.content;

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
    } catch (error: any) {
        console.error(`❌ Fallo con OpenRouter:`, error.response?.data || error.message);

        if (error.response?.status === 401) {
            return 'Error de autenticación: Verifica tu OPENROUTER_API_KEY.';
        }

        return 'Lo siento, no pude conectar con el servicio de inteligencia. Por favor intenta más tarde.';
    }

    return 'No se pudo generar una respuesta.';
};