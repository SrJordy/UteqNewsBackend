
import { FastifyInstance } from 'fastify';
import { askAIHandler } from '../controllers/ai.controller';

/**
 * Registra las rutas para la interacción con la IA.
 * @param server - La instancia de Fastify.
 */
const aiRoutes = async (server: FastifyInstance) => {
    server.post('/ask', askAIHandler);
};

export default aiRoutes;
