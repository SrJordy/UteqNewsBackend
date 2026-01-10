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
const aiController_1 = require("../controllers/aiController");
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
const aiRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    server.post('/ask', aiRateLimit, aiController_1.askAIHandler);
    server.post('/test-models', aiController_1.testGroqHandler);
});
exports.default = aiRoutes;
