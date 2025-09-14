"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const career_controller_1 = require("../controllers/career.controller");
/**
 * Registra las rutas de las carreras en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const careerRoutes = async (server) => {
    server.get('/all', career_controller_1.handleGetCareers);
    server.get('/by-faculty/:facultyId', career_controller_1.handleGetCareersByFaculty);
};
exports.default = careerRoutes;
