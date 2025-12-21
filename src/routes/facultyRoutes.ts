
import { FastifyInstance } from 'fastify';
import { handleGetFaculties } from '../controllers/facultyController';

/**
 * Registra las rutas de las facultades en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const facultyRoutes = async (server: FastifyInstance) => {
    server.get('/all', handleGetFaculties);
};

export default facultyRoutes;
