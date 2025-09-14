"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const videos_controller_1 = require("../controllers/videos.controller");
/**
 * Registra las rutas de videos en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const videosRoutes = async (server) => {
    // Rutas para los resúmenes semanales
    server.get('/weekly-summaries/latest', videos_controller_1.handleGetLatestWeeklySummaries);
    server.get('/weekly-summaries/all', videos_controller_1.handleGetAllWeeklySummaries);
    // Rutas para los videos de TikTok
    server.get('/tiktoks/latest', videos_controller_1.handleGetLatestTikToks);
    server.get('/tiktoks/all', videos_controller_1.handleGetAllTikToks);
};
exports.default = videosRoutes;
