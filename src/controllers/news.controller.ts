
import { FastifyRequest, FastifyReply } from 'fastify';
import { getLatestNews, getAllNews } from '../services/uteqApi.service';

/**
 * Maneja la solicitud para obtener las 10 últimas noticias.
 */
export const handleGetLatestNews = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const news = await getLatestNews();
        return reply.code(200).send(news);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener últimas noticias.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};

/**
 * Maneja la solicitud para obtener todas las noticias.
 */
export const handleGetAllNews = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const news = await getAllNews();
        return reply.code(200).send(news);
    } catch (error) {
        console.error('Controller Error: Fallo al obtener todas las noticias.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al procesar su solicitud.' });
    }
};
