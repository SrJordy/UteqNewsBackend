import { FastifyRequest, FastifyReply } from 'fastify';
import {
    verifyToken,
    shouldRefreshToken,
    generateTokenPair,
    getCookieOptions,
    ACCESS_COOKIE_NAME,
    REFRESH_COOKIE_NAME
} from '../services/jwtService';

// Extender el tipo de FastifyRequest para incluir user
declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            userId: number;
            email: string;
            rol: string;
        };
    }
}

/**
 * Middleware para proteger rutas de admin
 * - Verifica el access token desde cookies
 * - Auto-renueva tokens cuando quedan menos de 10 min
 * - Agrega user al request
 */
export const requireAdminAuth = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        // Obtener tokens de cookies
        const accessToken = request.cookies[ACCESS_COOKIE_NAME];
        const refreshToken = request.cookies[REFRESH_COOKIE_NAME];

        if (!accessToken) {
            return reply.code(401).send({ error: 'No autorizado. Token no proporcionado.' });
        }

        // Verificar access token
        let decoded = verifyToken(accessToken);

        if (!decoded) {
            // Access token inválido o expirado, intentar con refresh
            if (!refreshToken) {
                return reply.code(401).send({ error: 'Sesión expirada. Por favor, inicia sesión nuevamente.' });
            }

            const refreshDecoded = verifyToken(refreshToken);
            if (!refreshDecoded || refreshDecoded.type !== 'refresh') {
                // Limpiar cookies inválidas
                reply.clearCookie(ACCESS_COOKIE_NAME, getCookieOptions());
                reply.clearCookie(REFRESH_COOKIE_NAME, getCookieOptions());
                return reply.code(401).send({ error: 'Sesión expirada. Por favor, inicia sesión nuevamente.' });
            }

            // Generar nuevos tokens
            const newTokens = generateTokenPair(refreshDecoded.userId, refreshDecoded.email, refreshDecoded.rol);
            const cookieOpts = getCookieOptions(process.env.NODE_ENV === 'production');

            reply.setCookie(ACCESS_COOKIE_NAME, newTokens.accessToken, {
                ...cookieOpts,
                maxAge: 15 * 60 * 1000 // 15 min
            });
            reply.setCookie(REFRESH_COOKIE_NAME, newTokens.refreshToken, {
                ...cookieOpts,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
            });

            decoded = verifyToken(newTokens.accessToken)!;
        } else if (decoded.type === 'access' && shouldRefreshToken(decoded)) {
            // Token válido pero cerca de expirar, renovar proactivamente
            const newTokens = generateTokenPair(decoded.userId, decoded.email, decoded.rol);
            const cookieOpts = getCookieOptions(process.env.NODE_ENV === 'production');

            reply.setCookie(ACCESS_COOKIE_NAME, newTokens.accessToken, {
                ...cookieOpts,
                maxAge: 15 * 60 * 1000
            });
            reply.setCookie(REFRESH_COOKIE_NAME, newTokens.refreshToken, {
                ...cookieOpts,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
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

    } catch (error) {
        console.error('Error en autenticación:', error);
        return reply.code(500).send({ error: 'Error interno de autenticación.' });
    }
};
