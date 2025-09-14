
import { FastifyInstance } from 'fastify';
import {
    handleGetLatestWeeklySummaries,
    handleGetAllWeeklySummaries,
    handleGetLatestTikToks,
    handleGetAllTikToks,
    handleGetFilteredWeeklySummaries,
    handleGetFilteredTikToks
} from '../controllers/videos.controller';

/**
 * Registra las rutas de videos en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const videosRoutes = async (server: FastifyInstance) => {
    // Rutas para los resúmenes semanales
    server.get('/weekly-summaries/latest', handleGetLatestWeeklySummaries);
    server.get('/weekly-summaries/all', handleGetAllWeeklySummaries);
    server.get('/weekly-summaries/filtered/:email', handleGetFilteredWeeklySummaries);

    // Rutas para los videos de TikTok
    server.get('/tiktoks/latest', handleGetLatestTikToks);
    server.get('/tiktoks/all', handleGetAllTikToks);
    server.get('/tiktoks/filtered/:email', handleGetFilteredTikToks);
};

export default videosRoutes;
