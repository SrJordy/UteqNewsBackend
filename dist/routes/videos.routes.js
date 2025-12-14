"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const videos_controller_1 = require("../controllers/videos.controller");
/**
 * Registra las rutas de videos en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const videosRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    // Rutas para los resúmenes semanales
    server.get('/weekly-summaries/latest', videos_controller_1.handleGetLatestWeeklySummaries);
    server.get('/weekly-summaries/all', videos_controller_1.handleGetAllWeeklySummaries);
    server.get('/weekly-summaries/filtered/:email', videos_controller_1.handleGetFilteredWeeklySummaries);
    // Rutas para los videos de TikTok
    server.get('/tiktoks/latest', videos_controller_1.handleGetLatestTikToks);
    server.get('/tiktoks/all', videos_controller_1.handleGetAllTikToks);
    server.get('/tiktoks/filtered/:email', videos_controller_1.handleGetFilteredTikToks);
});
exports.default = videosRoutes;
