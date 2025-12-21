import { FastifyInstance } from 'fastify';
import {
    getLatestNoticiasHandler,
    getAllNoticiasHandler,
    getNoticiaByIdHandler,
    getLatestTikToksHandler,
    getAllTikToksHandler,
    getLatestRevistasHandler,
    getAllRevistasHandler
} from '../controllers/mobileController';

/**
 * Rutas públicas para la aplicación móvil
 * NO requieren autenticación
 */
const mobileRoutes = async (server: FastifyInstance) => {
    // === NOTICIAS ===
    server.get('/noticias/latest', getLatestNoticiasHandler);
    server.get('/noticias/all', getAllNoticiasHandler);
    server.get('/noticias/:id', getNoticiaByIdHandler);

    // === TIKTOKS ===
    server.get('/tiktoks/latest', getLatestTikToksHandler);
    server.get('/tiktoks/all', getAllTikToksHandler);

    // === REVISTAS ===
    server.get('/revistas/latest', getLatestRevistasHandler);
    server.get('/revistas/all', getAllRevistasHandler);
};

export default mobileRoutes;
