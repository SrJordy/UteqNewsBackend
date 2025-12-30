import { FastifyRequest, FastifyReply } from 'fastify';
import { askAI, testGroqModels } from '../services/aiService';

interface AskAIInput {
    question: string;
}

export const askAIHandler = async (
    request: FastifyRequest<{ Body: AskAIInput }>,
    reply: FastifyReply
) => {
    try {
        const { question } = request.body;

        if (!question || question.trim().length === 0) {
            return reply.code(400).send({ error: 'El parámetro "question" es requerido.' });
        }

        const aiResponse = await askAI(question);
        return reply.code(200).send({ response: aiResponse });
    } catch (error: any) {
        console.error('Controller Error: Fallo al procesar la solicitud a la IA.', error);
        return reply.code(500).send({ error: error.message || 'Ocurrió un error en el servidor al consultar a la IA.' });
    }
};

// Handler para probar los modelos de Groq
export const testGroqHandler = async (
    request: FastifyRequest<{ Body: { question?: string } }>,
    reply: FastifyReply
) => {
    try {
        const question = request.body?.question || '¿Cuál es la malla curricular de Ingeniería en Software?';

        // Ejecutar prueba en background (no bloquea la respuesta)
        testGroqModels(question);

        return reply.code(200).send({
            message: 'Prueba de modelos iniciada. Revisa los logs del servidor para ver los resultados.',
            question: question
        });
    } catch (error: any) {
        console.error('Error al iniciar prueba:', error);
        return reply.code(500).send({ error: 'Error al iniciar prueba de modelos' });
    }
};
