
import { FastifyRequest, FastifyReply } from 'fastify';
import { getLatestMagazines, getAllMagazines } from '../services/uteqApiService';

/**
 * Maneja la solicitud para obtener las 10 últimas revistas.
 */
export const handleGetLatestMagazines = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const magazines = await getLatestMagazines();
        return reply.code(200).send(magazines);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener últimas revistas.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};

/**
 * Maneja la solicitud para obtener todas las revistas.
 */
export const handleGetAllMagazines = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const magazines = await getAllMagazines();
        return reply.code(200).send(magazines);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener todas las revistas.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
