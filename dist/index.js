"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const news_routes_1 = __importDefault(require("./routes/news.routes"));
const videos_routes_1 = __importDefault(require("./routes/videos.routes"));
const magazine_routes_1 = __importDefault(require("./routes/magazine.routes"));
const faculty_routes_1 = __importDefault(require("./routes/faculty.routes"));
const career_routes_1 = __importDefault(require("./routes/career.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const server = (0, fastify_1.default)({ logger: true });
// Ruta principal para verificar el estado del servidor
server.get('/', async (request, reply) => {
    return { status: 'ok', message: 'Servidor UTEQNewsBackend funcionando' };
});
// Registrar las rutas de la API
server.register(auth_routes_1.default, { prefix: '/api/auth' });
server.register(news_routes_1.default, { prefix: '/api/news' });
server.register(videos_routes_1.default, { prefix: '/api/videos' });
server.register(magazine_routes_1.default, { prefix: '/api/magazines' });
server.register(faculty_routes_1.default, { prefix: '/api/faculties' });
server.register(career_routes_1.default, { prefix: '/api/careers' });
server.register(ai_routes_1.default, { prefix: '/api/ai' });
const start = async () => {
    try {
        await server.listen({ port: 3000 });
        server.log.info('🚀 Servidor corriendo en http://localhost:3000');
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
