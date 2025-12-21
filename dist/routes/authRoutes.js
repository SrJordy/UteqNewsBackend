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
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
/**
 * Registra las rutas de autenticación (registro, login, etc.)
 * @param server - La instancia de Fastify.
 */
const authRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    // Rutas públicas (app móvil)
    server.post('/register', authController_1.registerHandler);
    server.post('/verify-email', authController_1.verifyEmailHandler);
    server.post('/login', authController_1.loginHandler);
    server.patch('/update/:email', authController_1.updateHandler);
    // Rutas para la gestión de preferencias
    server.post('/preferences/add', authController_1.addPreferenceHandler);
    server.post('/preferences/remove', authController_1.removePreferenceHandler);
    server.get('/preferences/:email', authController_1.getPreferencesHandler);
    // Rutas para reseteo de contraseña
    server.post('/password/request-reset', authController_1.requestPasswordResetHandler);
    server.post('/password/reset', authController_1.resetPasswordHandler);
    // ======= ADMIN AUTH (JWT con Cookies) =======
    server.post('/admin/login', authController_1.adminLoginHandler);
    server.post('/admin/logout', authController_1.adminLogoutHandler);
    server.get('/admin/me', { preHandler: authMiddleware_1.requireAdminAuth }, authController_1.adminMeHandler);
});
exports.default = authRoutes;
