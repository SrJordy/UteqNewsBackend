import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función helper para construir rutas de uploads
// Devolvemos solo la ruta relativa, la app móvil construirá la URL completa
const getUploadPath = (path: string | null): string => {
    if (!path) return '';
    return `/uploads/${path}`;
};

interface PaginationQuery {
    page?: string;
    limit?: string;
}

// ===== NOTICIAS PÚBLICAS =====

/**
 * GET /api/mobile/noticias/latest - Últimas 10 noticias
 */
export const getLatestNoticiasHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const noticias = await prisma.noticia.findMany({
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
                JSON.parse(n.imagenesEvidencia).map((p: string) => getUploadPath(p)) : [],
            autor: n.autor ? `${n.autor.nombre} ${n.autor.apellido}` : 'PreSoft Admin'
        }));

        return reply.code(200).send(formatted);
    } catch (error) {
        console.error('Error al obtener últimas noticias:', error);
        return reply.code(500).send({ error: 'Error al obtener noticias' });
    }
};

/**
 * GET /api/mobile/noticias/all - Todas las noticias con paginación
 */
export const getAllNoticiasHandler = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const skip = (page - 1) * limit;

        const [noticias, total] = await Promise.all([
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
                JSON.parse(n.imagenesEvidencia).map((p: string) => getUploadPath(p)) : [],
            autor: n.autor ? `${n.autor.nombre} ${n.autor.apellido}` : 'PreSoft Admin'
        }));

        return reply.code(200).send({
            data: formatted,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('Error al obtener todas las noticias:', error);
        return reply.code(500).send({ error: 'Error al obtener noticias' });
    }
};

/**
 * GET /api/mobile/noticias/:id - Detalle de una noticia
 */
export const getNoticiaByIdHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const noticia = await prisma.noticia.findUnique({
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
                JSON.parse(noticia.imagenesEvidencia).map((p: string) => getUploadPath(p)) : [],
            autor: noticia.autor ? `${noticia.autor.nombre} ${noticia.autor.apellido}` : 'PreSoft Admin'
        };

        return reply.code(200).send(formatted);
    } catch (error) {
        console.error('Error al obtener noticia:', error);
        return reply.code(500).send({ error: 'Error al obtener noticia' });
    }
};

// ===== TIKTOKS PÚBLICOS =====

/**
 * GET /api/mobile/tiktoks/latest - Últimos 10 TikToks
 */
export const getLatestTikToksHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const tiktoks = await prisma.tikTok.findMany({
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
    } catch (error) {
        console.error('Error al obtener últimos TikToks:', error);
        return reply.code(500).send({ error: 'Error al obtener TikToks' });
    }
};

/**
 * GET /api/mobile/tiktoks/all - Todos los TikToks con paginación
 */
export const getAllTikToksHandler = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const skip = (page - 1) * limit;

        const [tiktoks, total] = await Promise.all([
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
    } catch (error) {
        console.error('Error al obtener todos los TikToks:', error);
        return reply.code(500).send({ error: 'Error al obtener TikToks' });
    }
};

// ===== REVISTAS PÚBLICAS =====

/**
 * GET /api/mobile/revistas/latest - Últimas 10 revistas
 */
export const getLatestRevistasHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const revistas = await prisma.revista.findMany({
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
    } catch (error) {
        console.error('Error al obtener últimas revistas:', error);
        return reply.code(500).send({ error: 'Error al obtener revistas' });
    }
};

/**
 * GET /api/mobile/revistas/all - Todas las revistas con paginación
 */
export const getAllRevistasHandler = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const skip = (page - 1) * limit;

        const [revistas, total] = await Promise.all([
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
    } catch (error) {
        console.error('Error al obtener todas las revistas:', error);
        return reply.code(500).send({ error: 'Error al obtener revistas' });
    }
};

// ===== UTILIDADES =====

function getCategoryColor(categoria: string | null): string {
    const colors: { [key: string]: string } = {
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

function getMonthNumber(mes: string): number {
    const months: { [key: string]: number } = {
        'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
        'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
        'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
    };
    return months[mes] || 1;
}
