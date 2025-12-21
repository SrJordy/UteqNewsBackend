"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRevistaHandler = exports.uploadTikTokPortadaHandler = exports.deleteEvidenciaHandler = exports.uploadEvidenciasHandler = exports.uploadNoticiaImagenHandler = exports.registerAdminHandler = exports.changePasswordHandler = exports.deleteUsuarioHandler = exports.toggleUsuarioEstadoHandler = exports.getActividadUsuarioHandler = exports.getUsuariosHandler = exports.deleteRevistaHandler = exports.getRevistasHandler = exports.deleteTikTokHandler = exports.createTikTokHandler = exports.getTikToksHandler = exports.deleteNoticiaHandler = exports.updateNoticiaHandler = exports.createNoticiaHandler = exports.getNoticiasHandler = void 0;
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcrypt = __importStar(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const mailer_1 = require("../lib/mailer");
const prisma = new client_1.PrismaClient();
// GET /api/admin/noticias - Listar con paginación y búsqueda
const getNoticiasHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [noticias, total] = yield Promise.all([
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
    }
    catch (error) {
        console.error('Error al obtener noticias:', error);
        return reply.code(500).send({ error: 'Error al obtener noticias' });
    }
});
exports.getNoticiasHandler = getNoticiasHandler;
// POST /api/admin/noticias - Crear noticia
const createNoticiaHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Obtener userId del token JWT
        const userId = 1; // Temporal - debería venir del auth
        const { titulo, contenido, categoria, urlExterna, destacada } = request.body;
        const noticia = yield prisma.noticia.create({
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
    }
    catch (error) {
        console.error('Error al crear noticia:', error);
        return reply.code(500).send({ error: 'Error al crear noticia' });
    }
});
exports.createNoticiaHandler = createNoticiaHandler;
// PUT /api/admin/noticias/:id - Actualizar noticia
const updateNoticiaHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const data = request.body;
        const noticia = yield prisma.noticia.update({
            where: { id },
            data
        });
        return reply.code(200).send(noticia);
    }
    catch (error) {
        if (error.code === 'P2025') {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }
        console.error('Error al actualizar noticia:', error);
        return reply.code(500).send({ error: 'Error al actualizar noticia' });
    }
});
exports.updateNoticiaHandler = updateNoticiaHandler;
// DELETE /api/admin/noticias/:id - Eliminar noticia (físico)
const deleteNoticiaHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        // Obtener noticia para borrar imagen si existe
        const noticia = yield prisma.noticia.findUnique({ where: { id } });
        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }
        // Borrar imagen si existe
        if (noticia.imagenPath) {
            const imagePath = path_1.default.join(__dirname, '../../uploads', noticia.imagenPath);
            if (fs_1.default.existsSync(imagePath)) {
                fs_1.default.unlinkSync(imagePath);
            }
        }
        // Borrar de BD
        yield prisma.noticia.delete({ where: { id } });
        return reply.code(200).send({ message: 'Noticia eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar noticia:', error);
        return reply.code(500).send({ error: 'Error al eliminar noticia' });
    }
});
exports.deleteNoticiaHandler = deleteNoticiaHandler;
// GET /api/admin/tiktoks
const getTikToksHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [tiktoks, total] = yield Promise.all([
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
    }
    catch (error) {
        console.error('Error al obtener tiktoks:', error);
        return reply.code(500).send({ error: 'Error al obtener tiktoks' });
    }
});
exports.getTikToksHandler = getTikToksHandler;
// POST /api/admin/tiktoks
const createTikTokHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = 1;
        const { titulo, descripcion, tiktokUrl } = request.body;
        const tiktok = yield prisma.tikTok.create({
            data: { titulo, descripcion, tiktokUrl, createdBy: userId }
        });
        return reply.code(201).send(tiktok);
    }
    catch (error) {
        console.error('Error al crear tiktok:', error);
        return reply.code(500).send({ error: 'Error al crear tiktok' });
    }
});
exports.createTikTokHandler = createTikTokHandler;
// DELETE /api/admin/tiktoks/:id
const deleteTikTokHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const tiktok = yield prisma.tikTok.findUnique({ where: { id } });
        if (!tiktok) {
            return reply.code(404).send({ error: 'TikTok no encontrado' });
        }
        // Borrar portada si existe
        if (tiktok.portadaPath) {
            const portadaPath = path_1.default.join(__dirname, '../../uploads', tiktok.portadaPath);
            if (fs_1.default.existsSync(portadaPath))
                fs_1.default.unlinkSync(portadaPath);
        }
        yield prisma.tikTok.delete({ where: { id } });
        return reply.code(200).send({ message: 'TikTok eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar tiktok:', error);
        return reply.code(500).send({ error: 'Error al eliminar tiktok' });
    }
});
exports.deleteTikTokHandler = deleteTikTokHandler;
// GET /api/admin/revistas
const getRevistasHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [revistas, total] = yield Promise.all([
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
    }
    catch (error) {
        console.error('Error al obtener revistas:', error);
        return reply.code(500).send({ error: 'Error al obtener revistas' });
    }
});
exports.getRevistasHandler = getRevistasHandler;
// DELETE /api/admin/revistas/:id
const deleteRevistaHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const revista = yield prisma.revista.findUnique({ where: { id } });
        if (!revista) {
            return reply.code(404).send({ error: 'Revista no encontrada' });
        }
        // Borrar archivos
        const portadaPath = path_1.default.join(__dirname, '../../uploads', revista.portadaPath);
        const pdfPath = path_1.default.join(__dirname, '../../uploads', revista.pdfPath);
        if (fs_1.default.existsSync(portadaPath))
            fs_1.default.unlinkSync(portadaPath);
        if (fs_1.default.existsSync(pdfPath))
            fs_1.default.unlinkSync(pdfPath);
        yield prisma.revista.delete({ where: { id } });
        return reply.code(200).send({ message: 'Revista eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar revista:', error);
        return reply.code(500).send({ error: 'Error al eliminar revista' });
    }
});
exports.deleteRevistaHandler = deleteRevistaHandler;
// ===== USUARIOS =====
// GET /api/admin/usuarios
const getUsuariosHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '10');
        const skip = (page - 1) * limit;
        const [usuarios, total] = yield Promise.all([
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
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        return reply.code(500).send({ error: 'Error al obtener usuarios' });
    }
});
exports.getUsuariosHandler = getUsuariosHandler;
// GET /api/admin/usuarios/:id/actividad
const getActividadUsuarioHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = parseInt(request.params.id);
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const skip = (page - 1) * limit;
        const [actividades, total] = yield Promise.all([
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
    }
    catch (error) {
        console.error('Error al obtener actividad:', error);
        return reply.code(500).send({ error: 'Error al obtener actividad' });
    }
});
exports.getActividadUsuarioHandler = getActividadUsuarioHandler;
// PUT /api/admin/usuarios/:id/estado - Activar/Desactivar usuario
const toggleUsuarioEstadoHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = parseInt(request.params.id);
        const { activo } = request.body;
        const currentUserId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.userId;
        // No permitir desactivarse a sí mismo
        if (currentUserId && currentUserId === id && !activo) {
            return reply.code(403).send({ error: 'No puedes desactivarte a ti mismo' });
        }
        // Verificar si es superadmin (no se puede desactivar)
        const usuarioActual = yield prisma.usuario.findUnique({ where: { id } });
        if (!usuarioActual) {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }
        if (usuarioActual.rol === 'superadmin' && !activo) {
            return reply.code(403).send({ error: 'No se puede desactivar al superadministrador' });
        }
        const usuario = yield prisma.usuario.update({
            where: { id },
            data: { activo },
            select: { id: true, email: true, activo: true }
        });
        return reply.code(200).send(usuario);
    }
    catch (error) {
        if (error.code === 'P2025') {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }
        console.error('Error al actualizar estado:', error);
        return reply.code(500).send({ error: 'Error al actualizar estado' });
    }
});
exports.toggleUsuarioEstadoHandler = toggleUsuarioEstadoHandler;
// DELETE /api/admin/usuarios/:id - Eliminar usuario permanentemente
const deleteUsuarioHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = parseInt(request.params.id);
        const currentUserId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.userId;
        // No permitir eliminarse a sí mismo
        if (currentUserId && currentUserId === id) {
            return reply.code(403).send({ error: 'No puedes eliminarte a ti mismo' });
        }
        // Verificar si el usuario existe y su rol
        const usuario = yield prisma.usuario.findUnique({ where: { id } });
        if (!usuario) {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }
        // No permitir eliminar superadmin
        if (usuario.rol === 'superadmin') {
            return reply.code(403).send({ error: 'No se puede eliminar al superadministrador' });
        }
        // Eliminar usuario de la base de datos
        yield prisma.usuario.delete({ where: { id } });
        return reply.code(200).send({ message: 'Usuario eliminado correctamente' });
    }
    catch (error) {
        if (error.code === 'P2025') {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }
        console.error('Error al eliminar usuario:', error);
        return reply.code(500).send({ error: 'Error al eliminar usuario' });
    }
});
exports.deleteUsuarioHandler = deleteUsuarioHandler;
// PUT /api/admin/usuarios/:id/cambiar-password - Cambiar contraseña (primer login)
const changePasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const { newPassword } = request.body;
        if (!newPassword || newPassword.length < 6) {
            return reply.code(400).send({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }
        const hashedPassword = yield bcrypt.hash(newPassword, 10);
        // Actualizar contraseña, verificar usuario y quitar primerLogin
        const usuario = yield prisma.usuario.update({
            where: { id },
            data: {
                password: hashedPassword,
                verificado: true,
                primerLogin: false
            },
            select: { id: true, email: true, verificado: true, primerLogin: true }
        });
        return reply.code(200).send({ message: 'Contraseña actualizada correctamente', usuario });
    }
    catch (error) {
        if (error.code === 'P2025') {
            return reply.code(404).send({ error: 'Usuario no encontrado' });
        }
        console.error('Error al cambiar contraseña:', error);
        return reply.code(500).send({ error: 'Error al cambiar contraseña' });
    }
});
exports.changePasswordHandler = changePasswordHandler;
const registerAdminHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, apellido, email } = request.body;
        // Validar email @uteq.edu.ec
        if (!email.endsWith('@uteq.edu.ec')) {
            return reply.code(400).send({ error: 'Solo se permiten correos @uteq.edu.ec' });
        }
        // Verificar si el email ya existe
        const existingUser = yield prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            return reply.code(400).send({ error: 'El correo ya está registrado' });
        }
        // Generar contraseña aleatoria
        const randomPassword = crypto_1.default.randomBytes(6).toString('hex');
        const hashedPassword = yield bcrypt.hash(randomPassword, 10);
        // Crear usuario admin
        const newAdmin = yield prisma.usuario.create({
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
            yield (0, mailer_1.sendAdminCredentialsEmail)(email, nombre, randomPassword);
            console.log(`✅ Credenciales enviadas a ${email}`);
        }
        catch (emailError) {
            console.error(`⚠️ No se pudo enviar email a ${email}. Contraseña: ${randomPassword}`);
        }
        return reply.code(201).send({
            id: newAdmin.id,
            email: newAdmin.email,
            nombre: newAdmin.nombre,
            rol: newAdmin.rol,
            message: 'Administrador creado. Las credenciales fueron enviadas al correo.'
        });
    }
    catch (error) {
        console.error('Error al registrar admin:', error);
        return reply.code(500).send({ error: 'Error al registrar administrador' });
    }
});
exports.registerAdminHandler = registerAdminHandler;
// ===== UPLOAD HANDLERS =====
// POST /api/admin/noticias/:id/imagen - Subir imagen de noticia
const uploadNoticiaImagenHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const data = yield request.file();
        if (!data) {
            return reply.code(400).send({ error: 'No se recibió ningún archivo' });
        }
        const noticia = yield prisma.noticia.findUnique({ where: { id } });
        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }
        // Crear directorio si no existe
        const uploadDir = path_1.default.join(__dirname, '../../uploads/noticias');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        // Guardar archivo
        const ext = path_1.default.extname(data.filename);
        const fileName = `noticia_${id}_${Date.now()}${ext}`;
        const filePath = path_1.default.join(uploadDir, fileName);
        const buffer = yield data.toBuffer();
        fs_1.default.writeFileSync(filePath, buffer);
        // Borrar imagen anterior si existe
        if (noticia.imagenPath) {
            const oldPath = path_1.default.join(__dirname, '../../uploads', noticia.imagenPath);
            if (fs_1.default.existsSync(oldPath))
                fs_1.default.unlinkSync(oldPath);
        }
        // Actualizar registro
        yield prisma.noticia.update({
            where: { id },
            data: { imagenPath: `noticias/${fileName}` }
        });
        return reply.code(200).send({ message: 'Imagen subida correctamente', path: `noticias/${fileName}` });
    }
    catch (error) {
        console.error('Error al subir imagen:', error);
        return reply.code(500).send({ error: 'Error al subir imagen' });
    }
});
exports.uploadNoticiaImagenHandler = uploadNoticiaImagenHandler;
// POST /api/admin/noticias/:id/evidencias - Subir imágenes de evidencia (múltiples)
const uploadEvidenciasHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const id = parseInt(request.params.id);
        const parts = request.parts();
        const noticia = yield prisma.noticia.findUnique({ where: { id } });
        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }
        // Crear directorio si no existe
        const uploadDir = path_1.default.join(__dirname, '../../uploads/noticias/evidencias');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        // Obtener imágenes existentes
        let imagenesActuales = [];
        if (noticia.imagenesEvidencia) {
            try {
                imagenesActuales = JSON.parse(noticia.imagenesEvidencia);
            }
            catch (e) { }
        }
        // Procesar cada archivo
        const nuevasImagenes = [];
        try {
            for (var _d = true, parts_1 = __asyncValues(parts), parts_1_1; parts_1_1 = yield parts_1.next(), _a = parts_1_1.done, !_a; _d = true) {
                _c = parts_1_1.value;
                _d = false;
                const part = _c;
                if (part.type === 'file') {
                    const ext = path_1.default.extname(part.filename);
                    const fileName = `evidencia_${id}_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
                    const filePath = path_1.default.join(uploadDir, fileName);
                    const buffer = yield part.toBuffer();
                    fs_1.default.writeFileSync(filePath, buffer);
                    nuevasImagenes.push(`noticias/evidencias/${fileName}`);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = parts_1.return)) yield _b.call(parts_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Combinar con imágenes existentes
        const todasImagenes = [...imagenesActuales, ...nuevasImagenes];
        // Actualizar registro
        yield prisma.noticia.update({
            where: { id },
            data: { imagenesEvidencia: JSON.stringify(todasImagenes) }
        });
        return reply.code(200).send({
            message: 'Imágenes de evidencia subidas correctamente',
            imagenes: todasImagenes
        });
    }
    catch (error) {
        console.error('Error al subir imágenes de evidencia:', error);
        return reply.code(500).send({ error: 'Error al subir imágenes' });
    }
});
exports.uploadEvidenciasHandler = uploadEvidenciasHandler;
// DELETE /api/admin/noticias/:id/evidencias - Eliminar una imagen de evidencia
const deleteEvidenciaHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const { imagenPath } = request.body;
        const noticia = yield prisma.noticia.findUnique({ where: { id } });
        if (!noticia) {
            return reply.code(404).send({ error: 'Noticia no encontrada' });
        }
        let imagenesActuales = [];
        if (noticia.imagenesEvidencia) {
            try {
                imagenesActuales = JSON.parse(noticia.imagenesEvidencia);
            }
            catch (e) { }
        }
        // Eliminar del array
        const nuevasImagenes = imagenesActuales.filter(img => img !== imagenPath);
        // Eliminar archivo físico
        const fullPath = path_1.default.join(__dirname, '../../uploads', imagenPath);
        if (fs_1.default.existsSync(fullPath))
            fs_1.default.unlinkSync(fullPath);
        // Actualizar registro
        yield prisma.noticia.update({
            where: { id },
            data: { imagenesEvidencia: JSON.stringify(nuevasImagenes) }
        });
        return reply.code(200).send({ message: 'Imagen eliminada', imagenes: nuevasImagenes });
    }
    catch (error) {
        console.error('Error al eliminar imagen:', error);
        return reply.code(500).send({ error: 'Error al eliminar imagen' });
    }
});
exports.deleteEvidenciaHandler = deleteEvidenciaHandler;
// POST /api/admin/tiktoks/:id/portada - Subir portada de TikTok
const uploadTikTokPortadaHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const data = yield request.file();
        if (!data) {
            return reply.code(400).send({ error: 'No se recibió ningún archivo' });
        }
        const tiktok = yield prisma.tikTok.findUnique({ where: { id } });
        if (!tiktok) {
            return reply.code(404).send({ error: 'TikTok no encontrado' });
        }
        const uploadDir = path_1.default.join(__dirname, '../../uploads/tiktoks');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const ext = path_1.default.extname(data.filename);
        const fileName = `tiktok_${id}_${Date.now()}${ext}`;
        const filePath = path_1.default.join(uploadDir, fileName);
        const buffer = yield data.toBuffer();
        fs_1.default.writeFileSync(filePath, buffer);
        if (tiktok.portadaPath) {
            const oldPath = path_1.default.join(__dirname, '../../uploads', tiktok.portadaPath);
            if (fs_1.default.existsSync(oldPath))
                fs_1.default.unlinkSync(oldPath);
        }
        yield prisma.tikTok.update({
            where: { id },
            data: { portadaPath: `tiktoks/${fileName}` }
        });
        return reply.code(200).send({ message: 'Portada subida correctamente', path: `tiktoks/${fileName}` });
    }
    catch (error) {
        console.error('Error al subir portada:', error);
        return reply.code(500).send({ error: 'Error al subir portada' });
    }
});
exports.uploadTikTokPortadaHandler = uploadTikTokPortadaHandler;
// POST /api/admin/revistas - Crear revista con archivos
const createRevistaHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_2, _b, _c;
    try {
        const userId = 1;
        const parts = request.parts();
        let titulo = '';
        let anio = 0;
        let mes = '';
        let portadaPath = '';
        let pdfPath = '';
        const portadaDir = path_1.default.join(__dirname, '../../uploads/revistas/portadas');
        const pdfDir = path_1.default.join(__dirname, '../../uploads/revistas/pdfs');
        if (!fs_1.default.existsSync(portadaDir))
            fs_1.default.mkdirSync(portadaDir, { recursive: true });
        if (!fs_1.default.existsSync(pdfDir))
            fs_1.default.mkdirSync(pdfDir, { recursive: true });
        try {
            for (var _d = true, parts_2 = __asyncValues(parts), parts_2_1; parts_2_1 = yield parts_2.next(), _a = parts_2_1.done, !_a; _d = true) {
                _c = parts_2_1.value;
                _d = false;
                const part = _c;
                if (part.type === 'field') {
                    if (part.fieldname === 'titulo')
                        titulo = part.value;
                    if (part.fieldname === 'anio')
                        anio = parseInt(part.value);
                    if (part.fieldname === 'mes')
                        mes = part.value;
                }
                else if (part.type === 'file') {
                    const buffer = yield part.toBuffer();
                    const ext = path_1.default.extname(part.filename);
                    const fileName = `revista_${Date.now()}${ext}`;
                    if (part.fieldname === 'portada') {
                        fs_1.default.writeFileSync(path_1.default.join(portadaDir, fileName), buffer);
                        portadaPath = `revistas/portadas/${fileName}`;
                    }
                    else if (part.fieldname === 'pdf') {
                        fs_1.default.writeFileSync(path_1.default.join(pdfDir, fileName), buffer);
                        pdfPath = `revistas/pdfs/${fileName}`;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = parts_2.return)) yield _b.call(parts_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (!titulo || !anio || !mes || !portadaPath || !pdfPath) {
            return reply.code(400).send({ error: 'Faltan campos requeridos' });
        }
        const revista = yield prisma.revista.create({
            data: { titulo, anio, mes, portadaPath, pdfPath, createdBy: userId }
        });
        return reply.code(201).send(revista);
    }
    catch (error) {
        console.error('Error al crear revista:', error);
        return reply.code(500).send({ error: 'Error al crear revista' });
    }
});
exports.createRevistaHandler = createRevistaHandler;
