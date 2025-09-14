"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetFilteredTikToks = exports.handleGetAllTikToks = exports.handleGetLatestTikToks = exports.handleGetFilteredWeeklySummaries = exports.handleGetAllWeeklySummaries = exports.handleGetLatestWeeklySummaries = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
// --- Resúmenes Semanales ---
/**
 * Maneja la solicitud para obtener los 10 últimos resúmenes semanales.
 */
const handleGetLatestWeeklySummaries = async (request, reply) => {
    try {
        const summaries = await (0, uteqApi_service_1.getLatestWeeklySummaries)();
        return reply.code(200).send(summaries);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener últimos resúmenes semanales.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetLatestWeeklySummaries = handleGetLatestWeeklySummaries;
/**
 * Maneja la solicitud para obtener todos los resúmenes semanales.
 */
const handleGetAllWeeklySummaries = async (request, reply) => {
    try {
        const summaries = await (0, uteqApi_service_1.getAllWeeklySummaries)();
        return reply.code(200).send(summaries);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener todos los resúmenes semanales.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetAllWeeklySummaries = handleGetAllWeeklySummaries;
/**
 * Maneja la solicitud para obtener resúmenes semanales filtrados por las preferencias del usuario.
 */
const handleGetFilteredWeeklySummaries = async (request, reply) => {
    try {
        const { email } = request.params;
        if (!email) {
            return reply.code(400).send({ error: 'El email del usuario es requerido para filtrar resúmenes semanales.' });
        }
        const filteredSummaries = await (0, uteqApi_service_1.getFilteredContent)('weekly-summaries', email);
        return reply.code(200).send(filteredSummaries);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener resúmenes semanales filtrados.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener resúmenes semanales filtrados.' });
    }
};
exports.handleGetFilteredWeeklySummaries = handleGetFilteredWeeklySummaries;
// --- TikToks ---
/**
 * Maneja la solicitud para obtener los 10 últimos videos de TikTok.
 */
const handleGetLatestTikToks = async (request, reply) => {
    try {
        const tiktoks = await (0, uteqApi_service_1.getLatestTikToks)();
        return reply.code(200).send(tiktoks);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener últimos TikToks.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetLatestTikToks = handleGetLatestTikToks;
/**
 * Maneja la solicitud para obtener todos los videos de TikTok.
 */
const handleGetAllTikToks = async (request, reply) => {
    try {
        const tiktoks = await (0, uteqApi_service_1.getAllTikToks)();
        return reply.code(200).send(tiktoks);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener todos los TikToks.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetAllTikToks = handleGetAllTikToks;
/**
 * Maneja la solicitud para obtener videos de TikTok filtrados por las preferencias del usuario.
 */
const handleGetFilteredTikToks = async (request, reply) => {
    try {
        const { email } = request.params;
        if (!email) {
            return reply.code(400).send({ error: 'El email del usuario es requerido para filtrar TikToks.' });
        }
        const filteredTikToks = await (0, uteqApi_service_1.getFilteredContent)('tiktoks', email);
        return reply.code(200).send(filteredTikToks);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener TikToks filtrados.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener TikToks filtrados.' });
    }
};
exports.handleGetFilteredTikToks = handleGetFilteredTikToks;
