"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ai_controller_1 = require("../controllers/ai.controller");
/**
 * Registra las rutas para la interacción con la IA.
 * @param server - La instancia de Fastify.
 */
const aiRoutes = async (server) => {
    server.post('/ask', ai_controller_1.askAIHandler);
};
exports.default = aiRoutes;
