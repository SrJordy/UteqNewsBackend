"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magazine_controller_1 = require("../controllers/magazine.controller");
/**
 * Registra las rutas de las revistas en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const magazineRoutes = async (server) => {
    server.get('/latest', magazine_controller_1.handleGetLatestMagazines);
    server.get('/all', magazine_controller_1.handleGetAllMagazines);
};
exports.default = magazineRoutes;
