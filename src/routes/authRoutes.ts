import { FastifyInstance } from 'fastify';
import { registerHandler, verifyEmailHandler, loginHandler, updateHandler, addPreferenceHandler, removePreferenceHandler, getPreferencesHandler, requestPasswordResetHandler, resetPasswordHandler, adminLoginHandler, adminLogoutHandler, adminMeHandler } from '../controllers/authController';
import { requireAdminAuth } from '../middleware/authMiddleware';

/**
 * Registra las rutas de autenticación (registro, login, etc.)
 * @param server - La instancia de Fastify.
 */
const authRoutes = async (server: FastifyInstance) => {
    // Rutas públicas (app móvil)
    server.post('/register', registerHandler);
    server.post('/verify-email', verifyEmailHandler);
    server.post('/login', loginHandler);
    server.patch('/update/:email', updateHandler);

    // Rutas para la gestión de preferencias
    server.post('/preferences/add', addPreferenceHandler);
    server.post('/preferences/remove', removePreferenceHandler);
    server.get('/preferences/:email', getPreferencesHandler);

    // Rutas para reseteo de contraseña
    server.post('/password/request-reset', requestPasswordResetHandler);
    server.post('/password/reset', resetPasswordHandler);

    // ======= ADMIN AUTH (JWT con Cookies) =======
    server.post('/admin/login', adminLoginHandler);
    server.post('/admin/logout', adminLogoutHandler);
    server.get('/admin/me', { preHandler: requireAdminAuth }, adminMeHandler);
};

export default authRoutes;