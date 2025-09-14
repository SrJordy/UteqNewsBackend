"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllNews = exports.handleGetLatestNews = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
/**
 * Maneja la solicitud para obtener las 10 últimas noticias.
 */
const handleGetLatestNews = async (request, reply) => {
    try {
        const news = await (0, uteqApi_service_1.getLatestNews)();
        return reply.code(200).send(news);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener últimas noticias.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetLatestNews = handleGetLatestNews;
/**
 * Maneja la solicitud para obtener todas las noticias.
 */
const handleGetAllNews = async (request, reply) => {
    try {
        const news = await (0, uteqApi_service_1.getAllNews)();
        return reply.code(200).send(news);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener todas las noticias.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
exports.handleGetAllNews = handleGetAllNews;
