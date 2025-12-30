import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import fastifyCookie from '@fastify/cookie';
import path from 'path';
import newsRoutes from './routes/newsRoutes';
import magazineRoutes from './routes/magazineRoutes';
import facultyRoutes from './routes/facultyRoutes';
import careerRoutes from './routes/careerRoutes';
import authRoutes from './routes/authRoutes';
import aiRoutes from './routes/aiRoutes';
import adminRoutes from './routes/adminRoutes';
import mobileRoutes from './routes/mobileRoutes';

const server = Fastify({ logger: true });

// Registrar plugin de cookies (DEBE estar antes de CORS)
server.register(fastifyCookie);

// Registrar el plugin CORS
server.register(cors, {
  origin: true, // Permitir cualquier origen para la app móvil
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

// Rate Limiting - Protección contra spam y ataques de fuerza bruta
server.register(rateLimit, {
  max: 100, // Máximo 100 peticiones
  timeWindow: '1 minute', // Por minuto
  errorResponseBuilder: () => ({
    statusCode: 429,
    error: 'Demasiadas peticiones',
    message: 'Has superado el límite de peticiones. Intenta de nuevo en un minuto.'
  })
});

// Registrar multipart para uploads
server.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});

// Servir archivos estáticos (uploads)
server.register(fastifyStatic, {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/',
});

// Ruta principal para verificar el estado del servidor
server.get('/', async (request, reply) => {
  return { status: 'ok', message: 'PreSoft Backend funcionando' };
});

// Registrar las rutas de la API
server.register(authRoutes, { prefix: '/api/auth' });
server.register(newsRoutes, { prefix: '/api/news' });
server.register(magazineRoutes, { prefix: '/api/magazines' });
server.register(facultyRoutes, { prefix: '/api/faculties' });
server.register(careerRoutes, { prefix: '/api/careers' });
server.register(aiRoutes, { prefix: '/api/ai' });
server.register(adminRoutes, { prefix: '/api/admin' });
server.register(mobileRoutes, { prefix: '/api/mobile' }); // Rutas públicas para app móvil


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