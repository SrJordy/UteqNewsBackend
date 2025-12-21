import { FastifyInstance } from 'fastify';
import { handleGetLatestNews, handleGetAllNews, handleGetFilteredNews } from '../controllers/newsController';

const newsRoutes = async (server: FastifyInstance) => {
    server.get('/latest', handleGetLatestNews);
    server.get('/all', handleGetAllNews);
    server.get('/filtered/:email', handleGetFilteredNews);
};

export default newsRoutes;