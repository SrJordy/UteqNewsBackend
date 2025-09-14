
import { FastifyRequest, FastifyReply } from 'fastify';
import { getFaculties } from '../services/uteqApi.service';

/**
 * Maneja la solicitud para obtener todas las facultades.
 */
export const handleGetFaculties = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const faculties = await getFaculties();
        return reply.code(200).send(faculties);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener las facultades.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
