"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllMagazines = exports.handleGetLatestMagazines = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
/**
 * Maneja la solicitud para obtener las 10 últimas revistas.
 */
const handleGetLatestMagazines = async (request, reply) => {
    try {
        const magazines = await (0, uteqApi_service_1.getLatestMagazines)();
        return reply.code(200).send(magazines);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener últimas revistas.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetLatestMagazines = handleGetLatestMagazines;
/**
 * Maneja la solicitud para obtener todas las revistas.
 */
const handleGetAllMagazines = async (request, reply) => {
    try {
        const magazines = await (0, uteqApi_service_1.getAllMagazines)();
        return reply.code(200).send(magazines);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener todas las revistas.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetAllMagazines = handleGetAllMagazines;
