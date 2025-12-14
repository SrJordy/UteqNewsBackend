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
exports.handleGetFilteredTikToks = exports.handleGetAllTikToks = exports.handleGetLatestTikToks = exports.handleGetFilteredWeeklySummaries = exports.handleGetAllWeeklySummaries = exports.handleGetLatestWeeklySummaries = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
// --- Resúmenes Semanales ---
/**
 * Maneja la solicitud para obtener los 10 últimos resúmenes semanales.
 */
const handleGetLatestWeeklySummaries = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summaries = yield (0, uteqApi_service_1.getLatestWeeklySummaries)();
        return reply.code(200).send(summaries);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener últimos resúmenes semanales.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetLatestWeeklySummaries = handleGetLatestWeeklySummaries;
/**
 * Maneja la solicitud para obtener todos los resúmenes semanales.
 */
const handleGetAllWeeklySummaries = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summaries = yield (0, uteqApi_service_1.getAllWeeklySummaries)();
        return reply.code(200).send(summaries);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener todos los resúmenes semanales.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetAllWeeklySummaries = handleGetAllWeeklySummaries;
/**
 * Maneja la solicitud para obtener resúmenes semanales filtrados por las preferencias del usuario.
 */
const handleGetFilteredWeeklySummaries = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.params;
        if (!email) {
            return reply.code(400).send({ error: 'El email del usuario es requerido para filtrar resúmenes semanales.' });
        }
        const filteredSummaries = yield (0, uteqApi_service_1.getFilteredContent)('weekly-summaries', email);
        return reply.code(200).send(filteredSummaries);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener resúmenes semanales filtrados.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener resúmenes semanales filtrados.' });
    }
});
exports.handleGetFilteredWeeklySummaries = handleGetFilteredWeeklySummaries;
// --- TikToks ---
/**
 * Maneja la solicitud para obtener los 10 últimos videos de TikTok.
 */
const handleGetLatestTikToks = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiktoks = yield (0, uteqApi_service_1.getLatestTikToks)();
        return reply.code(200).send(tiktoks);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener últimos TikToks.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetLatestTikToks = handleGetLatestTikToks;
/**
 * Maneja la solicitud para obtener todos los videos de TikTok.
 */
const handleGetAllTikToks = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiktoks = yield (0, uteqApi_service_1.getAllTikToks)();
        return reply.code(200).send(tiktoks);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener todos los TikToks.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetAllTikToks = handleGetAllTikToks;
/**
 * Maneja la solicitud para obtener videos de TikTok filtrados por las preferencias del usuario.
 */
const handleGetFilteredTikToks = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.params;
        if (!email) {
            return reply.code(400).send({ error: 'El email del usuario es requerido para filtrar TikToks.' });
        }
        const filteredTikToks = yield (0, uteqApi_service_1.getFilteredContent)('tiktoks', email);
        return reply.code(200).send(filteredTikToks);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener TikToks filtrados.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener TikToks filtrados.' });
    }
});
exports.handleGetFilteredTikToks = handleGetFilteredTikToks;
