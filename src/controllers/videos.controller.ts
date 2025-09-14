import { FastifyRequest, FastifyReply } from 'fastify';
import { getLatestWeeklySummaries, getAllWeeklySummaries, getLatestTikToks, getAllTikToks } from '../services/uteqApi.service';

// --- Resúmenes Semanales ---

/**
 * Maneja la solicitud para obtener los 10 últimos resúmenes semanales.
 */
export const handleGetLatestWeeklySummaries = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const summaries = await getLatestWeeklySummaries();
        return reply.code(200).send(summaries);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener últimos resúmenes semanales.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};

/**
 * Maneja la solicitud para obtener todos los resúmenes semanales.
 */
export const handleGetAllWeeklySummaries = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const summaries = await getAllWeeklySummaries();
        return reply.code(200).send(summaries);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener todos los resúmenes semanales.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};

// --- TikToks ---

/**
 * Maneja la solicitud para obtener los 10 últimos videos de TikTok.
 */
export const handleGetLatestTikToks = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const tiktoks = await getLatestTikToks();
        return reply.code(200).send(tiktoks);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener últimos TikToks.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};

/**
 * Maneja la solicitud para obtener todos los videos de TikTok.
 */
export const handleGetAllTikToks = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const tiktoks = await getAllTikToks();
        return reply.code(200).send(tiktoks);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener todos los TikToks.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};