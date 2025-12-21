
import { FastifyRequest, FastifyReply } from 'fastify';
import { getLatestNews, getAllNews, getLatestWeeklySummaries, getAllWeeklySummaries, getLatestTikToks, getAllTikToks, getFilteredContent } from '../services/uteqApiService';

// --- Noticias ---

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

/**
 * Maneja la solicitud para obtener noticias filtradas por las preferencias del usuario.
 */
export const handleGetFilteredNews = async (
    request: FastifyRequest<{ Params: { email: string } }>,
    reply: FastifyReply
) => {
    try {
        const { email } = request.params;
        if (!email) {
            return reply.code(400).send({ error: 'El email del usuario es requerido para filtrar noticias.' });
        }
        // Llama a la función genérica con el tipo de contenido 'news'
        const filteredNews = await getFilteredContent('news', email);
        return reply.code(200).send(filteredNews);
    } catch (error: any) {
        console.error('Controller Error: Fallo al obtener noticias filtradas.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener noticias filtradas.' });
    }
};
