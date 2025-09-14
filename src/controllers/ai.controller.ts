
import { FastifyRequest, FastifyReply } from 'fastify';
import { askAI } from '../services/ai.service';

interface AskAIInput {
    type: 'career' | 'faculty';
    name: string;
    question: string;
}

export const askAIHandler = async (
    request: FastifyRequest<{ Body: AskAIInput }>,
    reply: FastifyReply
) => {
    try {
        const { type, name, question } = request.body;

        if (!type || !name || !question) {
            return reply.code(400).send({ error: 'Faltan parámetros: type, name y question son requeridos.' });
        }

        const aiResponse = await askAI(type, name, question);
        return reply.code(200).send({ response: aiResponse });
    } catch (error: any) {
        console.error('Controller Error: Fallo al procesar la solicitud a la IA.', error);
        return reply.code(500).send({ error: error.message || 'Ocurrió un error en el servidor al consultar a la IA.' });
    }
};
