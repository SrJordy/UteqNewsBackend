import { FastifyRequest, FastifyReply } from 'fastify';
import { getCareers, getCareersByFaculty } from '../services/uteqApi.service';

/**
 * Maneja la solicitud para obtener todas las carreras.
 */
export const handleGetCareers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const careers = await getCareers();
        return reply.code(200).send(careers);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener las carreras.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};

/**
 * Maneja la solicitud para obtener las carreras de una facultad específica.
 */
export const handleGetCareersByFaculty = async (request: FastifyRequest<{ Params: { facultyId: string } }>, reply: FastifyReply) => {
    try {
        const { facultyId } = request.params;
        if (!facultyId) {
            return reply.code(400).send({ error: 'El ID de la facultad es requerido.' });
        }
        const careers = await getCareersByFaculty(facultyId);
        return reply.code(200).send(careers);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener las carreras por facultad.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};