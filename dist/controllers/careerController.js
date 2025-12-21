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
exports.handleGetCareersByFaculty = exports.handleGetCareers = void 0;
const uteqApiService_1 = require("../services/uteqApiService");
/**
 * Maneja la solicitud para obtener todas las carreras.
 */
const handleGetCareers = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const careers = yield (0, uteqApiService_1.getCareers)();
        return reply.code(200).send(careers);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener las carreras.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetCareers = handleGetCareers;
/**
 * Maneja la solicitud para obtener las carreras de una facultad específica.
 */
const handleGetCareersByFaculty = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { facultyId } = request.params;
        if (!facultyId) {
            return reply.code(400).send({ error: 'El ID de la facultad es requerido.' });
        }
        const careers = yield (0, uteqApiService_1.getCareersByFaculty)(facultyId);
        return reply.code(200).send(careers);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener las carreras por facultad.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetCareersByFaculty = handleGetCareersByFaculty;
