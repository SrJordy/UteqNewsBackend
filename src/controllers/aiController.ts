import { FastifyRequest, FastifyReply } from 'fastify';
import { askAI } from '../services/aiService';

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
