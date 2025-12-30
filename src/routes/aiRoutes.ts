
import { FastifyInstance } from 'fastify';
import { askAIHandler, testGroqHandler } from '../controllers/aiController';

/**
 * Registra las rutas para la interacción con la IA.
 * @param server - La instancia de Fastify.
 */
const aiRoutes = async (server: FastifyInstance) => {
    server.post('/ask', askAIHandler);
    server.post('/test-models', testGroqHandler); // Ruta para probar modelos de Groq
};

export default aiRoutes;
