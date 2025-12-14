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
exports.resetPasswordHandler = exports.requestPasswordResetHandler = exports.getPreferencesHandler = exports.removePreferenceHandler = exports.addPreferenceHandler = exports.updateHandler = exports.loginHandler = exports.verifyEmailHandler = exports.registerHandler = void 0;
const auth_service_1 = require("../services/auth.service");
const registerHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Register request received:', JSON.stringify(request.body));
        const user = yield (0, auth_service_1.registerUser)(request.body);
        console.log('User registered successfully:', user.email);
        return reply.code(201).send(user); // 201 Created
    }
    catch (error) {
        console.error('Registration error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });
        // Si el error es porque el email ya existe
        if (error.message && error.message.includes('registrado')) {
            return reply.code(409).send({ error: error.message }); // 409 Conflict
        }
        console.error('Controller Error: Fallo en el registro de usuario.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al registrar el usuario.' });
    }
});
exports.registerHandler = registerHandler;
const verifyEmailHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code } = request.body;
        const result = yield (0, auth_service_1.verifyEmail)(email, code);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo en la verificación de correo.', error);
        // Errores específicos para el usuario
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Código de verificación inválido o expirado')) {
            return reply.code(400).send({ error: error.message }); // 400 Bad Request
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al verificar el correo.' });
    }
});
exports.verifyEmailHandler = verifyEmailHandler;
const loginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1.loginUser)(request.body);
        return reply.code(200).send(user);
    }
    catch (error) {
        console.error('Controller Error: Fallo en el inicio de sesión.', error);
        // Errores específicos para el usuario
        if (error.message.includes('Credenciales inválidas') || error.message.includes('verifica tu correo')) {
            return reply.code(401).send({ error: error.message }); // 401 Unauthorized
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al iniciar sesión.' });
    }
});
exports.loginHandler = loginHandler;
const updateHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.params;
        const updatedUser = yield (0, auth_service_1.updateUser)(email, request.body);
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
        const result = yield (0, auth_service_1.addPreference)(email, careerName);
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
        const result = yield (0, auth_service_1.removePreference)(email, careerName);
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
        const preferences = yield (0, auth_service_1.getPreferences)(email);
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
        const result = yield (0, auth_service_1.requestPasswordReset)(email);
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
        const result = yield (0, auth_service_1.resetPassword)(request.body);
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
