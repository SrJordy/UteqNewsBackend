import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendAdminCredentialsEmail } from '../lib/mailer';
import { compressImage } from '../lib/imageCompressor';

const prisma = new PrismaClient();

// ===== NOTICIAS =====

interface NoticiaInput {
    titulo: string;
    contenido: string;
    categoria?: string;
    urlExterna?: string;
    destacada?: boolean;
}

interface PaginationQuery {
    page?: string;
    limit?: string;
    search?: string;
}

// GET /api/admin/noticias - Listar con paginación y búsqueda
export const getNoticiasHandler = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '10');
        const search = (request.query.search || '').trim();
        const skip = (page - 1) * limit;

        const whereClause = search ? {
            OR: [
                { titulo: { contains: search } },
                { contenido: { contains: search } }
            ]
        } : {};

        const [noticias, total] = await Promise.all([
            prisma.noticia.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { autor: { select: { nombre: true, apellido: true } } }
            }),
            prisma.noticia.count({ where: whereClause })
        ]);

        return reply.code(200).send({
            data: noticias,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        return reply.code(500).send({ error: 'Error al obtener noticias' });
    }
};

// POST /api/admin/noticias - Crear noticia
export const createNoticiaHandler = async (
    request: FastifyRequest<{ Body: NoticiaInput }>,
    reply: FastifyReply
) => {
    try {
        // TODO: Obtener userId del token JWT
        const userId = 1; // Temporal - debería venir del auth

        const { titulo, contenido, categoria, urlExterna, destacada } = request.body;

        const noticia = await prisma.noticia.create({
            data: {
                titulo,
                contenido,
                categoria: categoria || 'General',
                urlExterna,
                destacada: destacada || false,
                createdBy: userId
            }
        });

        return reply.code(201).send(noticia);
    } catch (error) {
        console.error('Error al crear noticia:', error);
        return reply.code(500).send({ error: 'Error al crear noticia' });
    }
};

// PUT /api/admin/noticias/:id - Actualizar noticia
export const updateNoticiaHandler = async (
    request: FastifyRequest<{ Params: { id: string }; Body: Partial<NoticiaInput> }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const data = request.body;

        const noticia = await prisma.noticia.update({
            where: { id },
            data
        });

        return reply.code(200).send(noticia);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }
        console.error('Error al actualizar noticia:', error);
        return reply.code(500).send({ error: 'Error al actualizar noticia' });
    }
};

// DELETE /api/admin/noticias/:id - Eliminar noticia (físico)
export const deleteNoticiaHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);

        // Obtener noticia para borrar imagen y evidencias si existen
        const noticia = await prisma.noticia.findUnique({ where: { id } });

        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }

        // Borrar imagen de portada si existe
        if (noticia.imagenPath) {
            const imagePath = path.join(__dirname, '../../uploads', noticia.imagenPath);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`📷 Imagen de portada eliminada: ${noticia.imagenPath}`);
            }
        }

        // Borrar imágenes de evidencias si existen
        if (noticia.imagenesEvidencia) {
            try {
                const evidencias = JSON.parse(noticia.imagenesEvidencia) as string[];
                for (const evidenciaPath of evidencias) {
                    const evidenciaFullPath = path.join(__dirname, '../../uploads', evidenciaPath);
                    if (fs.existsSync(evidenciaFullPath)) {
                        fs.unlinkSync(evidenciaFullPath);
                        console.log(`🗑️ Evidencia eliminada: ${evidenciaPath}`);
                    }
                }
            } catch (parseError) {
                console.error('Error al parsear evidencias:', parseError);
            }
        }

        // Borrar de BD
        await prisma.noticia.delete({ where: { id } });

        return reply.code(200).send({ message: 'Noticia eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar noticia:', error);
        return reply.code(500).send({ error: 'Error al eliminar noticia' });
    }
};

// ===== TIKTOKS =====

interface TikTokInput {
    titulo: string;
    descripcion?: string;
    tiktokUrl: string;
}

// GET /api/admin/tiktoks
export const getTikToksHandler = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '10');
        const search = (request.query.search || '').trim();
        const skip = (page - 1) * limit;

        const whereClause = search ? {
            OR: [
                { titulo: { contains: search } },
                { descripcion: { contains: search } }
            ]
        } : {};

        const [tiktoks, total] = await Promise.all([
            prisma.tikTok.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { autor: { select: { nombre: true, apellido: true } } }
            }),
            prisma.tikTok.count({ where: whereClause })
        ]);

        return reply.code(200).send({
            data: tiktoks,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('Error al obtener tiktoks:', error);
        return reply.code(500).send({ error: 'Error al obtener tiktoks' });
    }
};

// POST /api/admin/tiktoks
export const createTikTokHandler = async (
    request: FastifyRequest<{ Body: TikTokInput }>,
    reply: FastifyReply
) => {
    try {
        const userId = 1;
        const { titulo, descripcion, tiktokUrl } = request.body;

        const tiktok = await prisma.tikTok.create({
            data: { titulo, descripcion, tiktokUrl, createdBy: userId }
        });

        return reply.code(201).send(tiktok);
    } catch (error) {
        console.error('Error al crear tiktok:', error);
        return reply.code(500).send({ error: 'Error al crear tiktok' });
    }
};

// DELETE /api/admin/tiktoks/:id
export const deleteTikTokHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);

        const tiktok = await prisma.tikTok.findUnique({ where: { id } });
        if (!tiktok) {
            return reply.code(404).send({ error: 'TikTok no encontrado' });
        }

        // Borrar portada si existe
        if (tiktok.portadaPath) {
            const portadaPath = path.join(__dirname, '../../uploads', tiktok.portadaPath);
            if (fs.existsSync(portadaPath)) fs.unlinkSync(portadaPath);
        }

        await prisma.tikTok.delete({ where: { id } });
        return reply.code(200).send({ message: 'TikTok eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar tiktok:', error);
        return reply.code(500).send({ error: 'Error al eliminar tiktok' });
    }
};

// ===== REVISTAS =====

interface RevistaInput {
    titulo: string;
    anio: number;
    mes: string;
}

// GET /api/admin/revistas
export const getRevistasHandler = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '10');
        const search = (request.query.search || '').trim();
        const skip = (page - 1) * limit;

        const whereClause = search ? {
            OR: [
                { titulo: { contains: search } },
                { mes: { contains: search } },
                { anio: isNaN(parseInt(search)) ? undefined : parseInt(search) }
            ].filter(Boolean)
        } : {};

        const [revistas, total] = await Promise.all([
            prisma.revista.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { autor: { select: { nombre: true, apellido: true } } }
            }),
            prisma.revista.count({ where: whereClause })
        ]);

        return reply.code(200).send({
            data: revistas,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('Error al obtener revistas:', error);
        return reply.code(500).send({ error: 'Error al obtener revistas' });
    }
};

// DELETE /api/admin/revistas/:id
export const deleteRevistaHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);

        const revista = await prisma.revista.findUnique({ where: { id } });
        if (!revista) {
            return reply.code(404).send({ error: 'Revista no encontrada' });
        }

        // Borrar archivos
        const portadaPath = path.join(__dirname, '../../uploads', revista.portadaPath);
        const pdfPath = path.join(__dirname, '../../uploads', revista.pdfPath);

        if (fs.existsSync(portadaPath)) fs.unlinkSync(portadaPath);
        if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);

        await prisma.revista.delete({ where: { id } });
        return reply.code(200).send({ message: 'Revista eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar revista:', error);
        return reply.code(500).send({ error: 'Error al eliminar revista' });
    }
};

// ===== USUARIOS =====

// GET /api/admin/usuarios
export const getUsuariosHandler = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '10');
        const skip = (page - 1) * limit;

        const [usuarios, total] = await Promise.all([
            prisma.usuario.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    nombre: true,
                    apellido: true,
                    email: true,
                    rol: true,
                    verificado: true,
                    activo: true,
                    createdAt: true
                }
            }),
            prisma.usuario.count()
        ]);

        return reply.code(200).send({
            data: usuarios,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return reply.code(500).send({ error: 'Error al obtener usuarios' });
    }
};

// GET /api/admin/usuarios/:id/actividad
export const getActividadUsuarioHandler = async (
    request: FastifyRequest<{ Params: { id: string }; Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const usuarioId = parseInt(request.params.id);
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const skip = (page - 1) * limit;

        const [actividades, total] = await Promise.all([
            prisma.actividadUsuario.findMany({
                where: { usuarioId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.actividadUsuario.count({ where: { usuarioId } })
        ]);

        return reply.code(200).send({
            data: actividades,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('Error al obtener actividad:', error);
        return reply.code(500).send({ error: 'Error al obtener actividad' });
    }
};

// PUT /api/admin/usuarios/:id/estado - Activar/Desactivar usuario
export const toggleUsuarioEstadoHandler = async (
    request: FastifyRequest<{ Params: { id: string }; Body: { activo: boolean } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const { activo } = request.body;
        const currentUserId = (request as any).user?.userId;

        // No permitir desactivarse a sí mismo
        if (currentUserId && currentUserId === id && !activo) {
            return reply.code(403).send({ error: 'No puedes desactivarte a ti mismo' });
        }

        // Verificar si es superadmin (no se puede desactivar)
        const usuarioActual = await prisma.usuario.findUnique({ where: { id } });
        if (!usuarioActual) {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }

        if (usuarioActual.rol === 'superadmin' && !activo) {
            return reply.code(403).send({ error: 'No se puede desactivar al superadministrador' });
        }

        const usuario = await prisma.usuario.update({
            where: { id },
            data: { activo },
            select: { id: true, email: true, activo: true }
        });

        return reply.code(200).send(usuario);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }
        console.error('Error al actualizar estado:', error);
        return reply.code(500).send({ error: 'Error al actualizar estado' });
    }
};

// DELETE /api/admin/usuarios/:id - Eliminar usuario permanentemente
export const deleteUsuarioHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const currentUserId = (request as any).user?.userId;

        // No permitir eliminarse a sí mismo
        if (currentUserId && currentUserId === id) {
            return reply.code(403).send({ error: 'No puedes eliminarte a ti mismo' });
        }

        // Verificar si el usuario existe y su rol
        const usuario = await prisma.usuario.findUnique({ where: { id } });
        if (!usuario) {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }

        // No permitir eliminar superadmin
        if (usuario.rol === 'superadmin') {
            return reply.code(403).send({ error: 'No se puede eliminar al superadministrador' });
        }

        // Eliminar usuario de la base de datos
        await prisma.usuario.delete({ where: { id } });

        return reply.code(200).send({ message: 'Usuario eliminado correctamente' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }
        console.error('Error al eliminar usuario:', error);
        return reply.code(500).send({ error: 'Error al eliminar usuario' });
    }
};

// PUT /api/admin/usuarios/:id/cambiar-password - Cambiar contraseña (primer login)
export const changePasswordHandler = async (
    request: FastifyRequest<{ Params: { id: string }; Body: { newPassword: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const { newPassword } = request.body;

        if (!newPassword || newPassword.length < 6) {
            return reply.code(400).send({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar contraseña, verificar usuario y quitar primerLogin
        const usuario = await prisma.usuario.update({
            where: { id },
            data: {
                password: hashedPassword,
                verificado: true,
                primerLogin: false
            },
            select: { id: true, email: true, verificado: true, primerLogin: true }
        });

        return reply.code(200).send({ message: 'Contraseña actualizada correctamente', usuario });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }
        console.error('Error al cambiar contraseña:', error);
        return reply.code(500).send({ error: 'Error al cambiar contraseña' });
    }
};

// POST /api/admin/usuarios/register-admin - Registrar nuevo admin
interface RegisterAdminInput {
    nombre: string;
    apellido: string;
    email: string;
}

export const registerAdminHandler = async (
    request: FastifyRequest<{ Body: RegisterAdminInput }>,
    reply: FastifyReply
) => {
    try {
        const { nombre, apellido, email } = request.body;

        // Validar email @uteq.edu.ec
        if (!email.endsWith('@uteq.edu.ec')) {
            return reply.code(400).send({ error: 'Solo se permiten correos @uteq.edu.ec' });
        }

        // Verificar si el email ya existe
        const existingUser = await prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            return reply.code(400).send({ error: 'El correo ya está registrado' });
        }

        // Generar contraseña aleatoria
        const randomPassword = crypto.randomBytes(6).toString('hex');
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        // Crear usuario admin
        const newAdmin = await prisma.usuario.create({
            data: {
                nombre,
                apellido,
                email,
                password: hashedPassword,
                rol: 'admin',
                verificado: false, // Se verifica en el primer inicio de sesión
                activo: true,
                primerLogin: true
            }
        });

        // Enviar email con credenciales
        try {
            await sendAdminCredentialsEmail(email, nombre, randomPassword);
            console.log(`✅ Credenciales enviadas a ${email}`);
        } catch (emailError) {
            console.error(`⚠️ No se pudo enviar email a ${email}. Contraseña: ${randomPassword}`);
        }

        return reply.code(201).send({
            id: newAdmin.id,
            email: newAdmin.email,
            nombre: newAdmin.nombre,
            rol: newAdmin.rol,
            message: 'Administrador creado. Las credenciales fueron enviadas al correo.'
        });
    } catch (error) {
        console.error('Error al registrar admin:', error);
        return reply.code(500).send({ error: 'Error al registrar administrador' });
    }
};

// ===== UPLOAD HANDLERS =====

// POST /api/admin/noticias/:id/imagen - Subir imagen de noticia
export const uploadNoticiaImagenHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const data = await request.file();

        if (!data) {
            return reply.code(400).send({ error: 'No se recibió ningún archivo' });
        }

        const noticia = await prisma.noticia.findUnique({ where: { id } });
        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }

        // Crear directorio si no existe
        const uploadDir = path.join(__dirname, '../../uploads/noticias');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Guardar archivo con compresión
        const ext = path.extname(data.filename).toLowerCase();
        const fileName = `noticia_${id}_${Date.now()}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        const buffer = await data.toBuffer();

        // Comprimir imagen antes de guardar
        const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        if (isImage) {
            await compressImage(buffer, filePath, { quality: 85, maxWidth: 1200 });
        } else {
            fs.writeFileSync(filePath, buffer);
        }

        // Borrar imagen anterior si existe
        if (noticia.imagenPath) {
            const oldPath = path.join(__dirname, '../../uploads', noticia.imagenPath);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        // Actualizar registro
        await prisma.noticia.update({
            where: { id },
            data: { imagenPath: `noticias/${fileName}` }
        });

        return reply.code(200).send({ message: 'Imagen subida y optimizada', path: `noticias/${fileName}` });
    } catch (error) {
        return reply.code(500).send({ error: 'Error al subir imagen' });
    }
};

// POST /api/admin/noticias/:id/evidencias - Subir imágenes de evidencia (múltiples)
export const uploadEvidenciasHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const parts = request.parts();

        const noticia = await prisma.noticia.findUnique({ where: { id } });
        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }

        // Crear directorio si no existe
        const uploadDir = path.join(__dirname, '../../uploads/noticias/evidencias');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Obtener imágenes existentes
        let imagenesActuales: string[] = [];
        if (noticia.imagenesEvidencia) {
            try { imagenesActuales = JSON.parse(noticia.imagenesEvidencia); } catch (e) { }
        }

        // Procesar cada archivo
        const nuevasImagenes: string[] = [];
        for await (const part of parts) {
            if (part.type === 'file') {
                const ext = path.extname(part.filename);
                const fileName = `evidencia_${id}_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
                const filePath = path.join(uploadDir, fileName);

                const buffer = await part.toBuffer();

                // Comprimir imagen de evidencia
                const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext.toLowerCase());
                if (isImage) {
                    await compressImage(buffer, filePath, { quality: 85, maxWidth: 1200 });
                } else {
                    fs.writeFileSync(filePath, buffer);
                }
                nuevasImagenes.push(`noticias/evidencias/${fileName}`);
            }
        }

        // Combinar con imágenes existentes
        const todasImagenes = [...imagenesActuales, ...nuevasImagenes];

        // Actualizar registro
        await prisma.noticia.update({
            where: { id },
            data: { imagenesEvidencia: JSON.stringify(todasImagenes) }
        });

        return reply.code(200).send({
            message: 'Imágenes de evidencia subidas correctamente',
            imagenes: todasImagenes
        });
    } catch (error) {
        console.error('Error al subir imágenes de evidencia:', error);
        return reply.code(500).send({ error: 'Error al subir imágenes' });
    }
};

// DELETE /api/admin/noticias/:id/evidencias - Eliminar una imagen de evidencia
export const deleteEvidenciaHandler = async (
    request: FastifyRequest<{ Params: { id: string }; Body: { imagenPath: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const { imagenPath } = request.body;

        const noticia = await prisma.noticia.findUnique({ where: { id } });
        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }

        let imagenesActuales: string[] = [];
        if (noticia.imagenesEvidencia) {
            try { imagenesActuales = JSON.parse(noticia.imagenesEvidencia); } catch (e) { }
        }

        // Eliminar del array
        const nuevasImagenes = imagenesActuales.filter(img => img !== imagenPath);

        // Eliminar archivo físico
        const fullPath = path.join(__dirname, '../../uploads', imagenPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

        // Actualizar registro
        await prisma.noticia.update({
            where: { id },
            data: { imagenesEvidencia: JSON.stringify(nuevasImagenes) }
        });

        return reply.code(200).send({ message: 'Imagen eliminada', imagenes: nuevasImagenes });
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        return reply.code(500).send({ error: 'Error al eliminar imagen' });
    }
};

// POST /api/admin/tiktoks/:id/portada - Subir portada de TikTok
export const uploadTikTokPortadaHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    try {
        const id = parseInt(request.params.id);
        const data = await request.file();

        if (!data) {
            return reply.code(400).send({ error: 'No se recibió ningún archivo' });
        }

        const tiktok = await prisma.tikTok.findUnique({ where: { id } });
        if (!tiktok) {
            return reply.code(404).send({ error: 'TikTok no encontrado' });
        }

        const uploadDir = path.join(__dirname, '../../uploads/tiktoks');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const ext = path.extname(data.filename);
        const fileName = `tiktok_${id}_${Date.now()}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        const buffer = await data.toBuffer();

        // Comprimir imagen de portada TikTok
        const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext.toLowerCase());
        if (isImage) {
            await compressImage(buffer, filePath, { quality: 85, maxWidth: 800 });
        } else {
            fs.writeFileSync(filePath, buffer);
        }

        if (tiktok.portadaPath) {
            const oldPath = path.join(__dirname, '../../uploads', tiktok.portadaPath);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await prisma.tikTok.update({
            where: { id },
            data: { portadaPath: `tiktoks/${fileName}` }
        });

        return reply.code(200).send({ message: 'Portada subida correctamente', path: `tiktoks/${fileName}` });
    } catch (error) {
        console.error('Error al subir portada:', error);
        return reply.code(500).send({ error: 'Error al subir portada' });
    }
};

// POST /api/admin/revistas - Crear revista con archivos
export const createRevistaHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const userId = 1;
        const parts = request.parts();

        let titulo = '';
        let anio = 0;
        let mes = '';
        let portadaPath = '';
        let pdfPath = '';

        const portadaDir = path.join(__dirname, '../../uploads/revistas/portadas');
        const pdfDir = path.join(__dirname, '../../uploads/revistas/pdfs');
        if (!fs.existsSync(portadaDir)) fs.mkdirSync(portadaDir, { recursive: true });
        if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

        for await (const part of parts) {
            if (part.type === 'field') {
                if (part.fieldname === 'titulo') titulo = part.value as string;
                if (part.fieldname === 'anio') anio = parseInt(part.value as string);
                if (part.fieldname === 'mes') mes = part.value as string;
            } else if (part.type === 'file') {
                const buffer = await part.toBuffer();
                const ext = path.extname(part.filename);
                const fileName = `revista_${Date.now()}${ext}`;

                if (part.fieldname === 'portada') {
                    // Comprimir portada de revista
                    const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext.toLowerCase());
                    if (isImage) {
                        await compressImage(buffer, path.join(portadaDir, fileName), { quality: 85, maxWidth: 800 });
                    } else {
                        fs.writeFileSync(path.join(portadaDir, fileName), buffer);
                    }
                    portadaPath = `revistas/portadas/${fileName}`;
                } else if (part.fieldname === 'pdf') {
                    fs.writeFileSync(path.join(pdfDir, fileName), buffer);
                    pdfPath = `revistas/pdfs/${fileName}`;
                }
            }
        }

        if (!titulo || !anio || !mes || !portadaPath || !pdfPath) {
            return reply.code(400).send({ error: 'Faltan campos requeridos' });
        }

        const revista = await prisma.revista.create({
            data: { titulo, anio, mes, portadaPath, pdfPath, createdBy: userId }
        });

        return reply.code(201).send(revista);
    } catch (error) {
        console.error('Error al crear revista:', error);
        return reply.code(500).send({ error: 'Error al crear revista' });
    }
};
