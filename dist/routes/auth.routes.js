"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
/**
 * Registra las rutas de autenticación (registro, login, etc.)
 * @param server - La instancia de Fastify.
 */
const authRoutes = async (server) => {
    server.post('/register', auth_controller_1.registerHandler);
    server.post('/verify-email', auth_controller_1.verifyEmailHandler);
    server.post('/login', auth_controller_1.loginHandler);
    server.patch('/update/:email', auth_controller_1.updateHandler);
    // Rutas para la gestión de preferencias
    server.post('/preferences/add', auth_controller_1.addPreferenceHandler);
    server.post('/preferences/remove', auth_controller_1.removePreferenceHandler);
    server.get('/preferences/:email', auth_controller_1.getPreferencesHandler);
    // Rutas para reseteo de contraseña
    server.post('/password/request-reset', auth_controller_1.requestPasswordResetHandler);
    server.post('/password/reset', auth_controller_1.resetPasswordHandler);
};
exports.default = authRoutes;
