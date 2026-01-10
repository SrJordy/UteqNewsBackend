import { FastifyInstance } from 'fastify';
import { registerHandler, verifyEmailHandler, loginHandler, updateHandler, addPreferenceHandler, removePreferenceHandler, getPreferencesHandler, requestPasswordResetHandler, resetPasswordHandler, adminLoginHandler, adminLogoutHandler, adminMeHandler } from '../controllers/authController';
import { requireAdminAuth } from '../middleware/authMiddleware';

// Rate limit config para rutas sensibles
const authRateLimit = {
    config: {
        rateLimit: {
            max: 5, // Máximo 5 intentos
            timeWindow: '1 minute',
            errorResponseBuilder: () => ({
                statusCode: 429,
                error: 'Demasiados intentos',
                message: 'Has superado el límite de intentos. Espera un minuto antes de intentar de nuevo.'
            })
        }
    }
};

/**
 * Registra las rutas de autenticación (registro, login, etc.)
 * @param server - La instancia de Fastify.
 */
const authRoutes = async (server: FastifyInstance) => {
    // Rutas públicas (app móvil) - Con rate limit estricto
    server.post('/register', authRateLimit, registerHandler);
    server.post('/verify-email', authRateLimit, verifyEmailHandler);
    server.post('/login', authRateLimit, loginHandler);
    server.patch('/update/:email', updateHandler);

    // Rutas para la gestión de preferencias
    server.post('/preferences/add', addPreferenceHandler);
    server.post('/preferences/remove', removePreferenceHandler);
    server.get('/preferences/:email', getPreferencesHandler);

    // Rutas para reseteo de contraseña - Con rate limit estricto
    server.post('/password/request-reset', authRateLimit, requestPasswordResetHandler);
    server.post('/password/reset', authRateLimit, resetPasswordHandler);

    // ======= ADMIN AUTH (JWT con Cookies) =======
    server.post('/admin/login', authRateLimit, adminLoginHandler);
    server.post('/admin/logout', adminLogoutHandler);
    server.get('/admin/me', { preHandler: requireAdminAuth }, adminMeHandler);
};

export default authRoutes;