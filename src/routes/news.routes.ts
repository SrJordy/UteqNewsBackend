
import { FastifyInstance } from 'fastify';
import { handleGetLatestNews, handleGetAllNews } from '../controllers/news.controller';

const newsRoutes = async (server: FastifyInstance) => {
    server.get('/latest', handleGetLatestNews);
    server.get('/all', handleGetAllNews);
};

export default newsRoutes;
