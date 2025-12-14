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
exports.handleGetAllMagazines = exports.handleGetLatestMagazines = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
/**
 * Maneja la solicitud para obtener las 10 últimas revistas.
 */
const handleGetLatestMagazines = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const magazines = yield (0, uteqApi_service_1.getLatestMagazines)();
        return reply.code(200).send(magazines);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener últimas revistas.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetLatestMagazines = handleGetLatestMagazines;
/**
 * Maneja la solicitud para obtener todas las revistas.
 */
const handleGetAllMagazines = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const magazines = yield (0, uteqApi_service_1.getAllMagazines)();
        return reply.code(200).send(magazines);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener todas las revistas.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetAllMagazines = handleGetAllMagazines;
