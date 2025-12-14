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
exports.askAIHandler = void 0;
const ai_service_1 = require("../services/ai.service");
const askAIHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question } = request.body;
        if (!question || question.trim().length === 0) {
            return reply.code(400).send({ error: 'El parámetro "question" es requerido.' });
        }
        const aiResponse = yield (0, ai_service_1.askAI)(question);
        return reply.code(200).send({ response: aiResponse });
    }
    catch (error) {
        console.error('Controller Error: Fallo al procesar la solicitud a la IA.', error);
        return reply.code(500).send({ error: error.message || 'Ocurrió un error en el servidor al consultar a la IA.' });
    }
});
exports.askAIHandler = askAIHandler;
