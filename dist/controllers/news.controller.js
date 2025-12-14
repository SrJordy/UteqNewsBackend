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
exports.handleGetFilteredNews = exports.handleGetAllNews = exports.handleGetLatestNews = void 0;
const uteqApi_service_1 = require("../services/uteqApi.service");
// --- Noticias ---
/**
 * Maneja la solicitud para obtener las 10 últimas noticias.
 */
const handleGetLatestNews = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield (0, uteqApi_service_1.getLatestNews)();
        return reply.code(200).send(news);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener últimas noticias.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetLatestNews = handleGetLatestNews;
/**
 * Maneja la solicitud para obtener todas las noticias.
 */
const handleGetAllNews = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield (0, uteqApi_service_1.getAllNews)();
        return reply.code(200).send(news);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener todas las noticias.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
});
exports.handleGetAllNews = handleGetAllNews;
/**
 * Maneja la solicitud para obtener noticias filtradas por las preferencias del usuario.
 */
const handleGetFilteredNews = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.params;
        if (!email) {
            return reply.code(400).send({ error: 'El email del usuario es requerido para filtrar noticias.' });
        }
        // Llama a la función genérica con el tipo de contenido 'news'
        const filteredNews = yield (0, uteqApi_service_1.getFilteredContent)('news', email);
        return reply.code(200).send(filteredNews);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener noticias filtradas.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener noticias filtradas.' });
    }
});
exports.handleGetFilteredNews = handleGetFilteredNews;
