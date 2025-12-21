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
exports.requireAdminAuth = void 0;
const jwtService_1 = require("../services/jwtService");
/**
 * Middleware para proteger rutas de admin
 * - Verifica el access token desde cookies
 * - Auto-renueva tokens cuando quedan menos de 10 min
 * - Agrega user al request
 */
const requireAdminAuth = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener tokens de cookies
        const accessToken = request.cookies[jwtService_1.ACCESS_COOKIE_NAME];
        const refreshToken = request.cookies[jwtService_1.REFRESH_COOKIE_NAME];
        if (!accessToken) {
            return reply.code(401).send({ error: 'No autorizado. Token no proporcionado.' });
        }
        // Verificar access token
        let decoded = (0, jwtService_1.verifyToken)(accessToken);
        if (!decoded) {
            // Access token inválido o expirado, intentar con refresh
            if (!refreshToken) {
                return reply.code(401).send({ error: 'Sesión expirada. Por favor, inicia sesión nuevamente.' });
            }
            const refreshDecoded = (0, jwtService_1.verifyToken)(refreshToken);
            if (!refreshDecoded || refreshDecoded.type !== 'refresh') {
                // Limpiar cookies inválidas
                reply.clearCookie(jwtService_1.ACCESS_COOKIE_NAME, (0, jwtService_1.getCookieOptions)());
                reply.clearCookie(jwtService_1.REFRESH_COOKIE_NAME, (0, jwtService_1.getCookieOptions)());
                return reply.code(401).send({ error: 'Sesión expirada. Por favor, inicia sesión nuevamente.' });
            }
            // Generar nuevos tokens
            const newTokens = (0, jwtService_1.generateTokenPair)(refreshDecoded.userId, refreshDecoded.email, refreshDecoded.rol);
            const cookieOpts = (0, jwtService_1.getCookieOptions)(process.env.NODE_ENV === 'production');
            reply.setCookie(jwtService_1.ACCESS_COOKIE_NAME, newTokens.accessToken, Object.assign(Object.assign({}, cookieOpts), { maxAge: 15 * 60 * 1000 // 15 min
             }));
            reply.setCookie(jwtService_1.REFRESH_COOKIE_NAME, newTokens.refreshToken, Object.assign(Object.assign({}, cookieOpts), { maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
             }));
            decoded = (0, jwtService_1.verifyToken)(newTokens.accessToken);
        }
        else if (decoded.type === 'access' && (0, jwtService_1.shouldRefreshToken)(decoded)) {
            // Token válido pero cerca de expirar, renovar proactivamente
            const newTokens = (0, jwtService_1.generateTokenPair)(decoded.userId, decoded.email, decoded.rol);
            const cookieOpts = (0, jwtService_1.getCookieOptions)(process.env.NODE_ENV === 'production');
            reply.setCookie(jwtService_1.ACCESS_COOKIE_NAME, newTokens.accessToken, Object.assign(Object.assign({}, cookieOpts), { maxAge: 15 * 60 * 1000 }));
            reply.setCookie(jwtService_1.REFRESH_COOKIE_NAME, newTokens.refreshToken, Object.assign(Object.assign({}, cookieOpts), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
        }
        // Verificar que el rol sea admin o superadmin
        if (decoded.rol !== 'admin' && decoded.rol !== 'superadmin') {
            return reply.code(403).send({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
        }
        // Agregar usuario al request
        request.user = {
            userId: decoded.userId,
            email: decoded.email,
            rol: decoded.rol
        };
    }
    catch (error) {
        console.error('Error en autenticación:', error);
        return reply.code(500).send({ error: 'Error interno de autenticación.' });
    }
});
exports.requireAdminAuth = requireAdminAuth;
