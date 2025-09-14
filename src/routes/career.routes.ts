import { FastifyInstance } from 'fastify';
import { handleGetCareers, handleGetCareersByFaculty } from '../controllers/career.controller';

/**
 * Registra las rutas de las carreras en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const careerRoutes = async (server: FastifyInstance) => {
    server.get('/all', handleGetCareers);
    server.get('/by-faculty/:facultyId', handleGetCareersByFaculty);
};

export default careerRoutes;