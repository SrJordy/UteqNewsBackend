"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetCareersByFaculty = exports.handleGetCareers = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
/**
 * Maneja la solicitud para obtener todas las carreras.
 */
const handleGetCareers = async (request, reply) => {
    try {
        const careers = await (0, uteqApi_service_1.getCareers)();
        return reply.code(200).send(careers);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener las carreras.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetCareers = handleGetCareers;
/**
 * Maneja la solicitud para obtener las carreras de una facultad específica.
 */
const handleGetCareersByFaculty = async (request, reply) => {
    try {
        const { facultyId } = request.params;
        if (!facultyId) {
            return reply.code(400).send({ error: 'El ID de la facultad es requerido.' });
        }
        const careers = await (0, uteqApi_service_1.getCareersByFaculty)(facultyId);
        return reply.code(200).send(careers);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener las carreras por facultad.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetCareersByFaculty = handleGetCareersByFaculty;
