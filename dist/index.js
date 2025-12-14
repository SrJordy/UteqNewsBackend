"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors")); // Importar el plugin CORS
const news_routes_1 = __importDefault(require("./routes/news.routes"));
const videos_routes_1 = __importDefault(require("./routes/videos.routes"));
const magazine_routes_1 = __importDefault(require("./routes/magazine.routes"));
const faculty_routes_1 = __importDefault(require("./routes/faculty.routes"));
const career_routes_1 = __importDefault(require("./routes/career.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const server = (0, fastify_1.default)({ logger: true });
// Registrar el plugin CORS
server.register(cors_1.default, {
    origin: '*' // Permitir todas las solicitudes de origen (para desarrollo)
});
// Ruta principal para verificar el estado del servidor
server.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: 'ok', message: 'Servidor UTEQNewsBackend funcionando' };
}));
// Registrar las rutas de la API
server.register(auth_routes_1.default, { prefix: '/api/auth' });
server.register(news_routes_1.default, { prefix: '/api/news' });
server.register(videos_routes_1.default, { prefix: '/api/videos' });
server.register(magazine_routes_1.default, { prefix: '/api/magazines' });
server.register(faculty_routes_1.default, { prefix: '/api/faculties' });
server.register(career_routes_1.default, { prefix: '/api/careers' });
server.register(ai_routes_1.default, { prefix: '/api/ai' });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: 3000, host: '0.0.0.0' });
        server.log.info('🚀 Servidor corriendo en http://0.0.0.0:3000');
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
