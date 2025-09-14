"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordHandler = exports.requestPasswordResetHandler = exports.getPreferencesHandler = exports.removePreferenceHandler = exports.addPreferenceHandler = exports.updateHandler = exports.loginHandler = exports.verifyEmailHandler = exports.registerHandler = void 0;
const auth_service_1 = require("../services/auth.service");
const registerHandler = async (request, reply) => {
    try {
        const user = await (0, auth_service_1.registerUser)(request.body);
        return reply.code(201).send(user); // 201 Created
    }
    catch (error) {
        // Si el error es porque el email ya existe
        if (error.message.includes('registrado')) {
            return reply.code(409).send({ error: error.message }); // 409 Conflict
        }
        console.error('Controller Error: Fallo en el registro de usuario.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al registrar el usuario.' });
    }
};
exports.registerHandler = registerHandler;
const verifyEmailHandler = async (request, reply) => {
    try {
        const { email, code } = request.body;
        const result = await (0, auth_service_1.verifyEmail)(email, code);
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
};
exports.verifyEmailHandler = verifyEmailHandler;
const loginHandler = async (request, reply) => {
    try {
        const user = await (0, auth_service_1.loginUser)(request.body);
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
};
exports.loginHandler = loginHandler;
const updateHandler = async (request, reply) => {
    try {
        const { email } = request.params;
        const updatedUser = await (0, auth_service_1.updateUser)(email, request.body);
        return reply.code(200).send(updatedUser);
    }
    catch (error) {
        console.error('Controller Error: Fallo al actualizar el usuario.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message }); // 404 Not Found
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al actualizar el usuario.' });
    }
};
exports.updateHandler = updateHandler;
const addPreferenceHandler = async (request, reply) => {
    try {
        const { email, careerName } = request.body;
        const result = await (0, auth_service_1.addPreference)(email, careerName);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo al añadir preferencia.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Esta preferencia ya ha sido añadida')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al añadir la preferencia.' });
    }
};
exports.addPreferenceHandler = addPreferenceHandler;
const removePreferenceHandler = async (request, reply) => {
    try {
        const { email, careerName } = request.body;
        const result = await (0, auth_service_1.removePreference)(email, careerName);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo al eliminar preferencia.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Carrera no encontrada') || error.message.includes('Preferencia no encontrada')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al eliminar la preferencia.' });
    }
};
exports.removePreferenceHandler = removePreferenceHandler;
const getPreferencesHandler = async (request, reply) => {
    try {
        const { email } = request.params;
        const preferences = await (0, auth_service_1.getPreferences)(email);
        return reply.code(200).send(preferences);
    }
    catch (error) {
        console.error('Controller Error: Fallo al obtener preferencias.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener las preferencias.' });
    }
};
exports.getPreferencesHandler = getPreferencesHandler;
const requestPasswordResetHandler = async (request, reply) => {
    try {
        const { email } = request.body;
        const result = await (0, auth_service_1.requestPasswordReset)(email);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo al solicitar reseteo de contraseña.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al solicitar reseteo de contraseña.' });
    }
};
exports.requestPasswordResetHandler = requestPasswordResetHandler;
const resetPasswordHandler = async (request, reply) => {
    try {
        const result = await (0, auth_service_1.resetPassword)(request.body);
        return reply.code(200).send(result);
    }
    catch (error) {
        console.error('Controller Error: Fallo al resetear contraseña.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Token de reseteo de contraseña inválido o expirado')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al resetear contraseña.' });
    }
};
exports.resetPasswordHandler = resetPasswordHandler;
