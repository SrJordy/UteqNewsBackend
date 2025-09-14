"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faculty_controller_1 = require("../controllers/faculty.controller");
/**
 * Registra las rutas de las facultades en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const facultyRoutes = async (server) => {
    server.get('/all', faculty_controller_1.handleGetFaculties);
};
exports.default = facultyRoutes;
