
import { FastifyInstance } from 'fastify';
import { registerHandler, verifyEmailHandler, loginHandler, updateHandler, addPreferenceHandler, removePreferenceHandler, getPreferencesHandler } from '../controllers/auth.controller';

/**
 * Registra las rutas de autenticación (registro, login, etc.)
 * @param server - La instancia de Fastify.
 */
const authRoutes = async (server: FastifyInstance) => {
    server.post('/register', registerHandler);
    server.post('/verify-email', verifyEmailHandler);
    server.post('/login', loginHandler);
    server.patch('/update/:email', updateHandler);

    // Rutas para la gestión de preferencias
    server.post('/preferences/add', addPreferenceHandler);
    server.post('/preferences/remove', removePreferenceHandler);
    server.get('/preferences/:email', getPreferencesHandler);
};

export default authRoutes;
