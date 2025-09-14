import Fastify from 'fastify';
import cors from '@fastify/cors'; // Importar el plugin CORS
import newsRoutes from './routes/news.routes';
import videosRoutes from './routes/videos.routes';
import magazineRoutes from './routes/magazine.routes';
import facultyRoutes from './routes/faculty.routes';
import careerRoutes from './routes/career.routes';
import authRoutes from './routes/auth.routes';
import aiRoutes from './routes/ai.routes';

const server = Fastify({ logger: true });

// Registrar el plugin CORS
server.register(cors, {
  origin: '*' // Permitir todas las solicitudes de origen (para desarrollo)
});

// Ruta principal para verificar el estado del servidor
server.get('/', async (request, reply) => {
  return { status: 'ok', message: 'Servidor UTEQNewsBackend funcionando' };
});

// Registrar las rutas de la API
server.register(authRoutes, { prefix: '/api/auth' });
server.register(newsRoutes, { prefix: '/api/news' });
server.register(videosRoutes, { prefix: '/api/videos' });
server.register(magazineRoutes, { prefix: '/api/magazines' });
server.register(facultyRoutes, { prefix: '/api/faculties' });
server.register(careerRoutes, { prefix: '/api/careers' });
server.register(aiRoutes, { prefix: '/api/ai' });


const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    server.log.info('🚀 Servidor corriendo en http://0.0.0.0:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();