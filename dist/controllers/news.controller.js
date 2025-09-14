"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetFilteredNews = exports.handleGetAllNews = exports.handleGetLatestNews = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
// --- Noticias ---
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
/**
 * Maneja la solicitud para obtener noticias filtradas por las preferencias del usuario.
 */
const handleGetFilteredNews = async (request, reply) => {
    try {
        const { email } = request.params;
        if (!email) {
            return reply.code(400).send({ error: 'El email del usuario es requerido para filtrar noticias.' });
        }
        // Llama a la función genérica con el tipo de contenido 'news'
        const filteredNews = await (0, uteqApi_service_1.getFilteredContent)('news', email);
        return reply.code(200).send(filteredNews);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener noticias filtradas.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener noticias filtradas.' });
    }
};
exports.handleGetFilteredNews = handleGetFilteredNews;
