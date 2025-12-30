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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordHandler = exports.requestPasswordResetHandler = exports.getPreferencesHandler = exports.removePreferenceHandler = exports.addPreferenceHandler = exports.updateHandler = exports.adminMeHandler = exports.adminLogoutHandler = exports.adminLoginHandler = exports.loginHandler = exports.verifyEmailHandler = exports.registerHandler = void 0;
const authService_1 = require("../services/authService");
const jwtService_1 = require("../services/jwtService");
const prisma_1 = require("../lib/prisma");
const bcrypt = __importStar(require("bcryptjs"));
const validation_1 = require("../lib/validation");
const registerHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validar input
        const validatedData = (0, validation_1.validateInput)(validation_1.registerSchema, request.body);
        const user = yield (0, authService_1.registerUser)(validatedData);
        return reply.code(201).send(user);
    }
    catch (error) {
        // Si el error es porque el email ya existe
        if (error.message && error.message.includes('registrado')) {
            return reply.code(409).send({ error: error.message });
        }
        // Error de validación
        if (error.message && !error.message.includes('servidor')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al registrar el usuario.' });
    }
});
exports.registerHandler = registerHandler;
const verifyEmailHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = (0, validation_1.validateInput)(validation_1.verifyEmailSchema, request.body);
        const result = yield (0, authService_1.verifyEmail)(validatedData.email, validatedData.code);
        return reply.code(200).send(result);
    }
    catch (error) {
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Código de verificación inválido')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al verificar el correo.' });
    }
});
exports.verifyEmailHandler = verifyEmailHandler;
// Login para app móvil (sin JWT, devuelve solo datos)
const loginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = (0, validation_1.validateInput)(validation_1.loginSchema, request.body);
        const user = yield (0, authService_1.loginUser)(validatedData);
        return reply.code(200).send(user);
    }
    catch (error) {
        if (error.message.includes('Credenciales inválidas') || error.message.includes('verifica tu correo')) {
            return reply.code(401).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al iniciar sesión.' });
    }
});
exports.loginHandler = loginHandler;
// ========== ADMIN AUTH (JWT con Cookies) ==========
/**
 * Login para Admin Panel - Genera JWT y los envía via cookies
 */
const adminLoginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        // Buscar usuario
        const user = yield prisma_1.prisma.usuario.findUnique({ where: { email } });
        if (!user) {
            return reply.code(401).send({ error: 'Credenciales inválidas.' });
        }
        // Verificar contraseña
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return reply.code(401).send({ error: 'Credenciales inválidas.' });
        }
        // Verificar que sea admin o superadmin
        if (user.rol !== 'admin' && user.rol !== 'superadmin') {
            return reply.code(403).send({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
        }
        // Generar tokens
        const tokens = (0, jwtService_1.generateTokenPair)(user.id, user.email, user.rol);
        const cookieOpts = (0, jwtService_1.getCookieOptions)(process.env.NODE_ENV === 'production');
        // Setear cookies
        reply.setCookie(jwtService_1.ACCESS_COOKIE_NAME, tokens.accessToken, Object.assign(Object.assign({}, cookieOpts), { maxAge: 15 * 60 * 1000 // 15 minutos
         }));
        reply.setCookie(jwtService_1.REFRESH_COOKIE_NAME, tokens.refreshToken, Object.assign(Object.assign({}, cookieOpts), { maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
         }));
        // Devolver datos del usuario (sin password)
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        return reply.code(200).send({
            user: userWithoutPassword,
            message: 'Login exitoso'
        });
    }
    catch (error) {
        console.error('Error en admin login:', error);
        return reply.code(500).send({ error: 'Error interno del servidor.' });
    }
});
exports.adminLoginHandler = adminLoginHandler;
/**
 * Logout para Admin - Limpia las cookies
 */
const adminLogoutHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const cookieOpts = (0, jwtService_1.getCookieOptions)(process.env.NODE_ENV === 'production');
    reply.clearCookie(jwtService_1.ACCESS_COOKIE_NAME, cookieOpts);
    reply.clearCookie(jwtService_1.REFRESH_COOKIE_NAME, cookieOpts);
    return reply.code(200).send({ message: 'Sesión cerrada exitosamente.' });
});
exports.adminLogoutHandler = adminLogoutHandler;
/**
 * Verificar sesión actual
 */
const adminMeHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    // El middleware ya verificó el token y agregó request.user
    if (!request.user) {
        return reply.code(401).send({ error: 'No autenticado.' });
    }
    const user = yield prisma_1.prisma.usuario.findUnique({
        where: { id: request.user.userId },
        select: { id: true, email: true, nombre: true, apellido: true, rol: true, primerLogin: true }
    });
    if (!user) {
        return reply.code(404).send({ error: 'Usuario no encontrado.' });
    }
    return reply.code(200).send({ user });
});
exports.adminMeHandler = adminMeHandler;
const updateHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.params;
        const updatedUser = yield (0, authService_1.updateUser)(email, request.body);
        return reply.code(200).send(updatedUser);
    }
    catch (error) {
        console.error('Controller Error: Fallo al actualizar el usuario.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message }); // 404 Not Found
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al actualizar el usuario.' });
    }
});
exports.updateHandler = updateHandler;
const addPreferenceHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, careerName } = request.body;
        const result = yield (0, authService_1.addPreference)(email, careerName);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo al añadir preferencia.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Esta preferencia ya ha sido añadida')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al añadir la preferencia.' });
    }
});
exports.addPreferenceHandler = addPreferenceHandler;
const removePreferenceHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, careerName } = request.body;
        const result = yield (0, authService_1.removePreference)(email, careerName);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo al eliminar preferencia.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Carrera no encontrada') || error.message.includes('Preferencia no encontrada')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al eliminar la preferencia.' });
    }
});
exports.removePreferenceHandler = removePreferenceHandler;
const getPreferencesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.params;
        const preferences = yield (0, authService_1.getPreferences)(email);
        return reply.code(200).send(preferences);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener preferencias.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener las preferencias.' });
    }
});
exports.getPreferencesHandler = getPreferencesHandler;
const requestPasswordResetHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        const result = yield (0, authService_1.requestPasswordReset)(email);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo al solicitar reseteo de contraseña.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al solicitar reseteo de contraseña.' });
    }
});
exports.requestPasswordResetHandler = requestPasswordResetHandler;
const resetPasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, authService_1.resetPassword)(request.body);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo al resetear contraseña.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Token de reseteo de contraseña inválido o expirado')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al resetear contraseña.' });
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
