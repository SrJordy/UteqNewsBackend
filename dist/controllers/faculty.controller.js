"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetFaculties = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
/**
 * Maneja la solicitud para obtener todas las facultades.
 */
const handleGetFaculties = async (request, reply) => {
    try {
        const faculties = await (0, uteqApi_service_1.getFaculties)();
        return reply.code(200).send(faculties);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener las facultades.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetFaculties = handleGetFaculties;
