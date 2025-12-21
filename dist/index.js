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
const cors_1 = __importDefault(require("@fastify/cors"));
const static_1 = __importDefault(require("@fastify/static"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const path_1 = __importDefault(require("path"));
const newsRoutes_1 = __importDefault(require("./routes/newsRoutes"));
const magazineRoutes_1 = __importDefault(require("./routes/magazineRoutes"));
const facultyRoutes_1 = __importDefault(require("./routes/facultyRoutes"));
const careerRoutes_1 = __importDefault(require("./routes/careerRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const server = (0, fastify_1.default)({ logger: true });
// Registrar plugin de cookies (DEBE estar antes de CORS)
server.register(cookie_1.default);
// Registrar el plugin CORS
server.register(cors_1.default, {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});
// Registrar multipart para uploads
server.register(multipart_1.default, {
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max
    }
});
// Servir archivos estáticos (uploads)
server.register(static_1.default, {
    root: path_1.default.join(__dirname, '../uploads'),
    prefix: '/uploads/',
});
// Ruta principal para verificar el estado del servidor
server.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: 'ok', message: 'PreSoft Backend funcionando' };
}));
// Registrar las rutas de la API
server.register(authRoutes_1.default, { prefix: '/api/auth' });
server.register(newsRoutes_1.default, { prefix: '/api/news' });
server.register(magazineRoutes_1.default, { prefix: '/api/magazines' });
server.register(facultyRoutes_1.default, { prefix: '/api/faculties' });
server.register(careerRoutes_1.default, { prefix: '/api/careers' });
server.register(aiRoutes_1.default, { prefix: '/api/ai' });
server.register(adminRoutes_1.default, { prefix: '/api/admin' });
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
