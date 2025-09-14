
import { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, verifyEmail, loginUser, updateUser, addPreference, removePreference, getPreferences } from '../services/auth.service';
import { RegisterUserInput, LoginUserInput, UpdateUserInput, PreferenceInput } from '../services/auth.schemas';

export const registerHandler = async (
    request: FastifyRequest<{ Body: RegisterUserInput }>,
    reply: FastifyReply
) => {
    try {
        const user = await registerUser(request.body);
        return reply.code(201).send(user); // 201 Created
    } catch (error: any) {
        // Si el error es porque el email ya existe
        if (error.message.includes('registrado')) {
            return reply.code(409).send({ error: error.message }); // 409 Conflict
        }
        console.error('Controller Error: Fallo en el registro de usuario.', error);
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al registrar el usuario.' });
    }
};

export const verifyEmailHandler = async (
    request: FastifyRequest<{ Body: { email: string; code: string } }>,
    reply: FastifyReply
) => {
    try {
        const { email, code } = request.body;
        const result = await verifyEmail(email, code);
        return reply.code(200).send(result);
    } catch (error: any) {
        console.error('Controller Error: Fallo en la verificación de correo.', error);
        // Errores específicos para el usuario
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Código de verificación inválido o expirado')) {
            return reply.code(400).send({ error: error.message }); // 400 Bad Request
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al verificar el correo.' });
    }
};

export const loginHandler = async (
    request: FastifyRequest<{ Body: LoginUserInput }>,
    reply: FastifyReply
) => {
    try {
        const user = await loginUser(request.body);
        return reply.code(200).send(user);
    } catch (error: any) {
        console.error('Controller Error: Fallo en el inicio de sesión.', error);
        // Errores específicos para el usuario
        if (error.message.includes('Credenciales inválidas') || error.message.includes('verifica tu correo')) {
            return reply.code(401).send({ error: error.message }); // 401 Unauthorized
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al iniciar sesión.' });
    }
};

export const updateHandler = async (
    request: FastifyRequest<{ Params: { email: string }; Body: UpdateUserInput }>,
    reply: FastifyReply
) => {
    try {
        const { email } = request.params;
        const updatedUser = await updateUser(email, request.body);
        return reply.code(200).send(updatedUser);
    } catch (error: any) {
        console.error('Controller Error: Fallo al actualizar el usuario.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message }); // 404 Not Found
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al actualizar el usuario.' });
    }
};

export const addPreferenceHandler = async (
    request: FastifyRequest<{ Body: PreferenceInput }>,
    reply: FastifyReply
) => {
    try {
        const { email, careerName } = request.body;
        const result = await addPreference(email, careerName);
        return reply.code(200).send(result);
    } catch (error: any) {
        console.error('Controller Error: Fallo al añadir preferencia.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Esta preferencia ya ha sido añadida')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al añadir la preferencia.' });
    }
};

export const removePreferenceHandler = async (
    request: FastifyRequest<{ Body: PreferenceInput }>,
    reply: FastifyReply
) => {
    try {
        const { email, careerName } = request.body;
        const result = await removePreference(email, careerName);
        return reply.code(200).send(result);
    } catch (error: any) {
        console.error('Controller Error: Fallo al eliminar preferencia.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Carrera no encontrada') || error.message.includes('Preferencia no encontrada')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al eliminar la preferencia.' });
    }
};

export const getPreferencesHandler = async (
    request: FastifyRequest<{ Params: { email: string } }>,
    reply: FastifyReply
) => {
    try {
        const { email } = request.params;
        const preferences = await getPreferences(email);
        return reply.code(200).send(preferences);
    } catch (error: any) {
        console.error('Controller Error: Fallo al obtener preferencias.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al obtener las preferencias.' });
    }
};
