
import { FastifyInstance } from 'fastify';
import { askAIHandler, testGroqHandler } from '../controllers/aiController';

// Rate limit para AI (más permisivo pero protegido)
const aiRateLimit = {
    config: {
        rateLimit: {
            max: 20, // 20 preguntas por minuto
            timeWindow: '1 minute',
            errorResponseBuilder: () => ({
                statusCode: 429,
                error: 'Límite alcanzado',
                message: 'Has hecho muchas preguntas. Espera un momento antes de continuar 😊'
            })
        }
    }
};

/**
 * Registra las rutas para la interacción con la IA.
 * @param server - La instancia de Fastify.
 */
const aiRoutes = async (server: FastifyInstance) => {
    server.post('/ask', aiRateLimit, askAIHandler);
    server.post('/test-models', testGroqHandler);
};

export default aiRoutes;
