import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
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

// === SEGURIDAD ===

// Registrar plugin de cookies
server.register(fastifyCookie);

// Helmet - Headers de seguridad HTTP (configurado para permitir recursos)
server.register(helmet, {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Permitir recursos cross-origin
  crossOriginOpenerPolicy: false,
});

// CORS - Permitir peticiones cross-origin
server.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

// === RENDIMIENTO ===

// Compresión Brotli/Gzip para respuestas
server.register(compress, {
  global: true,
  encodings: ['br', 'gzip', 'deflate'],
});

// Rate Limiting - Protección contra spam y fuerza bruta
server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: () => ({
    statusCode: 429,
    error: 'Demasiadas peticiones',
    message: 'Has superado el límite de peticiones. Intenta de nuevo en un minuto.'
  })
});

// === UPLOADS ===

// Multipart para archivos
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