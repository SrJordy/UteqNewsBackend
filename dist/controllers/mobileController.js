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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRevistasHandler = exports.getLatestRevistasHandler = exports.getAllTikToksHandler = exports.getLatestTikToksHandler = exports.getNoticiaByIdHandler = exports.getAllNoticiasHandler = exports.getLatestNoticiasHandler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Función helper para construir rutas de uploads
// Devolvemos solo la ruta relativa, la app móvil construirá la URL completa
const getUploadPath = (path) => {
    if (!path)
        return '';
    return `/uploads/${path}`;
};
// ===== NOTICIAS PÚBLICAS =====
/**
 * GET /api/mobile/noticias/latest - Últimas 10 noticias
 */
const getLatestNoticiasHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noticias = yield prisma.noticia.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { autor: { select: { nombre: true, apellido: true } } }
        });
        // Transformar al formato esperado por la app móvil
        // Las URLs son relativas, la app construye la URL completa
        const formatted = noticias.map(n => ({
            id: n.id.toString(),
            title: n.titulo,
            content: n.contenido,
            date: n.createdAt.toISOString(),
            newsUrl: n.urlExterna || '',
            coverUrl: getUploadPath(n.imagenPath),
            categoryName: n.categoria || 'General',
            categoryColor: getCategoryColor(n.categoria),
            evidencias: n.imagenesEvidencia ?
                JSON.parse(n.imagenesEvidencia).map((p) => getUploadPath(p)) : [],
            autor: n.autor ? `${n.autor.nombre} ${n.autor.apellido}` : 'PreSoft Admin'
        }));
        return reply.code(200).send(formatted);
    }
    catch (error) {
        console.error('Error al obtener últimas noticias:', error);
        return reply.code(500).send({ error: 'Error al obtener noticias' });
    }
});
exports.getLatestNoticiasHandler = getLatestNoticiasHandler;
/**
 * GET /api/mobile/noticias/all - Todas las noticias con paginación
 */
const getAllNoticiasHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const skip = (page - 1) * limit;
        const [noticias, total] = yield Promise.all([
            prisma.noticia.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { autor: { select: { nombre: true, apellido: true } } }
            }),
            prisma.noticia.count()
        ]);
        const formatted = noticias.map(n => ({
            id: n.id.toString(),
            title: n.titulo,
            content: n.contenido,
            date: n.createdAt.toISOString(),
            newsUrl: n.urlExterna || '',
            coverUrl: getUploadPath(n.imagenPath),
            categoryName: n.categoria || 'General',
            categoryColor: getCategoryColor(n.categoria),
            evidencias: n.imagenesEvidencia ?
                JSON.parse(n.imagenesEvidencia).map((p) => getUploadPath(p)) : [],
            autor: n.autor ? `${n.autor.nombre} ${n.autor.apellido}` : 'PreSoft Admin'
        }));
        return reply.code(200).send({
            data: formatted,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    }
    catch (error) {
        console.error('Error al obtener todas las noticias:', error);
        return reply.code(500).send({ error: 'Error al obtener noticias' });
    }
});
exports.getAllNoticiasHandler = getAllNoticiasHandler;
/**
 * GET /api/mobile/noticias/:id - Detalle de una noticia
 */
const getNoticiaByIdHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const noticia = yield prisma.noticia.findUnique({
            where: { id },
            include: { autor: { select: { nombre: true, apellido: true } } }
        });
        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }
        const formatted = {
            id: noticia.id.toString(),
            title: noticia.titulo,
            content: noticia.contenido,
            date: noticia.createdAt.toISOString(),
            newsUrl: noticia.urlExterna || '',
            coverUrl: getUploadPath(noticia.imagenPath),
            categoryName: noticia.categoria || 'General',
            categoryColor: getCategoryColor(noticia.categoria),
            evidencias: noticia.imagenesEvidencia ?
                JSON.parse(noticia.imagenesEvidencia).map((p) => getUploadPath(p)) : [],
            autor: noticia.autor ? `${noticia.autor.nombre} ${noticia.autor.apellido}` : 'PreSoft Admin'
        };
        return reply.code(200).send(formatted);
    }
    catch (error) {
        console.error('Error al obtener noticia:', error);
        return reply.code(500).send({ error: 'Error al obtener noticia' });
    }
});
exports.getNoticiaByIdHandler = getNoticiaByIdHandler;
// ===== TIKTOKS PÚBLICOS =====
/**
 * GET /api/mobile/tiktoks/latest - Últimos 10 TikToks
 */
const getLatestTikToksHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiktoks = yield prisma.tikTok.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' }
        });
        const formatted = tiktoks.map(t => ({
            id: t.id.toString(),
            title: t.titulo,
            description: t.descripcion || '',
            date: t.createdAt.toISOString(),
            videoUrl: t.tiktokUrl,
            coverUrl: getUploadPath(t.portadaPath)
        }));
        return reply.code(200).send(formatted);
    }
    catch (error) {
        console.error('Error al obtener últimos TikToks:', error);
        return reply.code(500).send({ error: 'Error al obtener TikToks' });
    }
});
exports.getLatestTikToksHandler = getLatestTikToksHandler;
/**
 * GET /api/mobile/tiktoks/all - Todos los TikToks con paginación
 */
const getAllTikToksHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const skip = (page - 1) * limit;
        const [tiktoks, total] = yield Promise.all([
            prisma.tikTok.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.tikTok.count()
        ]);
        const formatted = tiktoks.map(t => ({
            id: t.id.toString(),
            title: t.titulo,
            description: t.descripcion || '',
            date: t.createdAt.toISOString(),
            videoUrl: t.tiktokUrl,
            coverUrl: getUploadPath(t.portadaPath)
        }));
        return reply.code(200).send({
            data: formatted,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    }
    catch (error) {
        console.error('Error al obtener todos los TikToks:', error);
        return reply.code(500).send({ error: 'Error al obtener TikToks' });
    }
});
exports.getAllTikToksHandler = getAllTikToksHandler;
// ===== REVISTAS PÚBLICAS =====
/**
 * GET /api/mobile/revistas/latest - Últimas 10 revistas
 */
const getLatestRevistasHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revistas = yield prisma.revista.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' }
        });
        const formatted = revistas.map(r => ({
            id: r.id.toString(),
            title: r.titulo,
            year: r.anio,
            month: getMonthNumber(r.mes),
            monthName: r.mes,
            date: r.createdAt.toISOString(),
            coverUrl: getUploadPath(r.portadaPath),
            pdfUrl: getUploadPath(r.pdfPath)
        }));
        return reply.code(200).send(formatted);
    }
    catch (error) {
        console.error('Error al obtener últimas revistas:', error);
        return reply.code(500).send({ error: 'Error al obtener revistas' });
    }
});
exports.getLatestRevistasHandler = getLatestRevistasHandler;
/**
 * GET /api/mobile/revistas/all - Todas las revistas con paginación
 */
const getAllRevistasHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const skip = (page - 1) * limit;
        const [revistas, total] = yield Promise.all([
            prisma.revista.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.revista.count()
        ]);
        const formatted = revistas.map(r => ({
            id: r.id.toString(),
            title: r.titulo,
            year: r.anio,
            month: getMonthNumber(r.mes),
            monthName: r.mes,
            date: r.createdAt.toISOString(),
            coverUrl: getUploadPath(r.portadaPath),
            pdfUrl: getUploadPath(r.pdfPath)
        }));
        return reply.code(200).send({
            data: formatted,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    }
    catch (error) {
        console.error('Error al obtener todas las revistas:', error);
        return reply.code(500).send({ error: 'Error al obtener revistas' });
    }
});
exports.getAllRevistasHandler = getAllRevistasHandler;
// ===== UTILIDADES =====
function getCategoryColor(categoria) {
    const colors = {
        'Tecnología': '#3B82F6',
        'Deportes': '#10B981',
        'Cultura': '#8B5CF6',
        'Académico': '#F59E0B',
        'Eventos': '#EF4444',
        'Investigación': '#06B6D4',
        'General': '#6B7280'
    };
    return colors[categoria || 'General'] || '#6B7280';
}
function getMonthNumber(mes) {
    const months = {
        'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
        'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
        'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
    };
    return months[mes] || 1;
}
