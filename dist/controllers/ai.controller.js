"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAIHandler = void 0;
const ai_service_1 = require("../services/ai.service");
const askAIHandler = async (request, reply) => {
    try {
        const { type, name, question } = request.body;
        if (!type || !name || !question) {
            return reply.code(400).send({ error: 'Faltan parámetros: type, name y question son requeridos.' });
        }
        const aiResponse = await (0, ai_service_1.askAI)(type, name, question);
        return reply.code(200).send({ response: aiResponse });
    }
    catch (error) {
        console.error('Controller Error: Fallo al procesar la solicitud a la IA.', error);
        return reply.code(500).send({ error: error.message || 'Ocurrió un error en el servidor al consultar a la IA.' });
    }
};
exports.askAIHandler = askAIHandler;
