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
const auth_controller_1 = require("../controllers/auth.controller");
/**
 * Registra las rutas de autenticación (registro, login, etc.)
 * @param server - La instancia de Fastify.
 */
const authRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.default = authRoutes;
