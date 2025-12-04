"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAIHandler = void 0;
const ai_service_1 = require("../services/ai.service");
const askAIHandler = async (request, reply) => {
    try {
        const { question } = request.body;
        if (!question || question.trim().length === 0) {
            return reply.code(400).send({ error: 'El parámetro "question" es requerido.' });
        }
        const aiResponse = await (0, ai_service_1.askAI)(question);
        return reply.code(200).send({ response: aiResponse });
    }
    catch (error) {
        console.error('Controller Error: Fallo al procesar la solicitud a la IA.', error);
        return reply.code(500).send({ error: error.message || 'Ocurrió un error en el servidor al consultar a la IA.' });
    }
};
exports.askAIHandler = askAIHandler;
