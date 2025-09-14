import OpenAI from 'openai';
import { getCareers } from './uteqApi.service';
import { getFaculties } from './uteqApi.service';

// Asegúrate de que la API Key esté en tus variables de entorno
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY no está definida en las variables de entorno.');
}

// Configuración del cliente de OpenAI para usar OpenRouter
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OPENROUTER_API_KEY,
});

// CORREGIDO: Nombre exacto del modelo Deepseek en OpenRouter proporcionado por el usuario
const DEEPSEEK_MODEL = "deepseek/deepseek-chat-v3.1:free";

/**
 * Pregunta a la IA sobre una entidad (carrera o facultad) específica.
 * @param type - Tipo de entidad ('career' o 'faculty').
 * @param name - Nombre de la carrera o facultad.
 * @param question - La pregunta del usuario.
 * @returns La respuesta de la IA.
 */
export const askAI = async (type: 'career' | 'faculty', name: string, question: string): Promise<string> => {
    let context = '';
    let entityData: any;

    try {
        if (type === 'career') {
            const careers = await getCareers();
            entityData = careers.find(c => c.name.toLowerCase() === name.toLowerCase());
            if (entityData) {
                context = `Información sobre la carrera ${entityData.name}: Campo Ocupacional: ${entityData.description}. URL: ${entityData.careerUrl}.`;
            } else {
                context = `No se encontró información detallada sobre la carrera ${name}.`;
            }
        } else if (type === 'faculty') {
            const faculties = await getFaculties();
            entityData = faculties.find(f => f.name.toLowerCase() === name.toLowerCase());
            if (entityData) {
                context = `Información sobre la facultad ${entityData.name}: Misión: ${entityData.mission}. Visión: ${entityData.vision}. URL Video: ${entityData.videoUrl}. Facebook: ${entityData.facebookUrl}.`;
            } else {
                context = `No se encontró información detallada sobre la facultad ${name}.`;
            }
        }

        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: "system", content: `Eres un asistente de la Universidad Técnica Estatal de Quevedo (UTEQ). Responde preguntas sobre carreras y facultades basándote en la información proporcionada. Si la pregunta no está relacionada con la UTEQ o la información proporcionada, responde que no puedes ayudar con eso. ${context}` },
            { role: "user", content: question }
        ];

        const chatCompletion = await openai.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages: messages,
            temperature: 0.7, // Ajusta la creatividad de la respuesta
            max_tokens: 500, // Limita la longitud de la respuesta
        });

        return chatCompletion.choices[0].message.content || "No pude generar una respuesta.";

    } catch (error: any) { // Captura el error como 'any' para acceder a sus propiedades
        console.error(`Error al consultar a la IA sobre ${type} ${name}:`, error.message || error);
        // Si hay un error específico de la API de OpenAI/OpenRouter, lo mostramos
        if (error.response) {
            console.error('AI API Response Error Data:', error.response.data);
            console.error('AI API Response Error Status:', error.response.status);
            console.error('AI API Response Error Headers:', error.response.headers);
            throw new Error(`Error de la API de IA: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('AI API Request Error:', error.request);
            throw new Error('No se recibió respuesta de la API de IA.');
        } else {
            // Algo más causó el error
            throw new Error(`Error desconocido al consultar a la IA: ${error.message}`);
        }
    }
};