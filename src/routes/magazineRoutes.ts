
import { FastifyInstance } from 'fastify';
import { handleGetLatestMagazines, handleGetAllMagazines } from '../controllers/magazineController';

/**
 * Registra las rutas de las revistas en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const magazineRoutes = async (server: FastifyInstance) => {
    server.get('/latest', handleGetLatestMagazines);
    server.get('/all', handleGetAllMagazines);
};

export default magazineRoutes;
