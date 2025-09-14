"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllTikToks = exports.handleGetLatestTikToks = exports.handleGetAllWeeklySummaries = exports.handleGetLatestWeeklySummaries = void 0;
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
