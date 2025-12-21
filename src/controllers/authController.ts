import { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, verifyEmail, loginUser, updateUser, addPreference, removePreference, getPreferences, requestPasswordReset, resetPassword } from '../services/authService';
import { RegisterUserInput, LoginUserInput, UpdateUserInput, PreferenceInput, RequestPasswordResetInput, ResetPasswordInput } from '../services/authSchemas';
import { generateTokenPair, getCookieOptions, ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME, verifyToken } from '../services/jwtService';
import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcryptjs';

export const registerHandler = async (
    request: FastifyRequest<{ Body: RegisterUserInput }>,
    reply: FastifyReply
) => {
    try {
        console.log('Register request received:', JSON.stringify(request.body));
        const user = await registerUser(request.body);
        console.log('User registered successfully:', user.email);
        return reply.code(201).send(user); // 201 Created
    } catch (error: any) {
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

// Login para app móvil (sin JWT, devuelve solo datos)
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

// ========== ADMIN AUTH (JWT con Cookies) ==========

/**
 * Login para Admin Panel - Genera JWT y los envía via cookies
 */
export const adminLoginHandler = async (
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
) => {
    try {
        const { email, password } = request.body;

        // Buscar usuario
        const user = await prisma.usuario.findUnique({ where: { email } });
        if (!user) {
            return reply.code(401).send({ error: 'Credenciales inválidas.' });
        }

        // Verificar contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return reply.code(401).send({ error: 'Credenciales inválidas.' });
        }

        // Verificar que sea admin o superadmin
        if (user.rol !== 'admin' && user.rol !== 'superadmin') {
            return reply.code(403).send({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
        }

        // Generar tokens
        const tokens = generateTokenPair(user.id, user.email, user.rol);
        const cookieOpts = getCookieOptions(process.env.NODE_ENV === 'production');

        // Setear cookies
        reply.setCookie(ACCESS_COOKIE_NAME, tokens.accessToken, {
            ...cookieOpts,
            maxAge: 15 * 60 * 1000 // 15 minutos
        });
        reply.setCookie(REFRESH_COOKIE_NAME, tokens.refreshToken, {
            ...cookieOpts,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });

        // Devolver datos del usuario (sin password)
        const { password: _, ...userWithoutPassword } = user;
        return reply.code(200).send({
            user: userWithoutPassword,
            message: 'Login exitoso'
        });

    } catch (error: any) {
        console.error('Error en admin login:', error);
        return reply.code(500).send({ error: 'Error interno del servidor.' });
    }
};

/**
 * Logout para Admin - Limpia las cookies
 */
export const adminLogoutHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const cookieOpts = getCookieOptions(process.env.NODE_ENV === 'production');
    reply.clearCookie(ACCESS_COOKIE_NAME, cookieOpts);
    reply.clearCookie(REFRESH_COOKIE_NAME, cookieOpts);
    return reply.code(200).send({ message: 'Sesión cerrada exitosamente.' });
};

/**
 * Verificar sesión actual
 */
export const adminMeHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    // El middleware ya verificó el token y agregó request.user
    if (!request.user) {
        return reply.code(401).send({ error: 'No autenticado.' });
    }

    const user = await prisma.usuario.findUnique({
        where: { id: request.user.userId },
        select: { id: true, email: true, nombre: true, apellido: true, rol: true, primerLogin: true }
    });

    if (!user) {
        return reply.code(404).send({ error: 'Usuario no encontrado.' });
    }

    return reply.code(200).send({ user });
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

export const requestPasswordResetHandler = async (
    request: FastifyRequest<{ Body: RequestPasswordResetInput }>,
    reply: FastifyReply
) => {
    try {
        const { email } = request.body;
        const result = await requestPasswordReset(email);
        return reply.code(200).send(result);
    } catch (error: any) {
        console.error('Controller Error: Fallo al solicitar reseteo de contraseña.', error);
        if (error.message.includes('Usuario no encontrado')) {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al solicitar reseteo de contraseña.' });
    }
};

export const resetPasswordHandler = async (
    request: FastifyRequest<{ Body: ResetPasswordInput }>,
    reply: FastifyReply
) => {
    try {
        const result = await resetPassword(request.body);
        return reply.code(200).send(result);
    } catch (error: any) {
        console.error('Controller Error: Fallo al resetear contraseña.', error);
        if (error.message.includes('Usuario no encontrado') || error.message.includes('Token de reseteo de contraseña inválido o expirado')) {
            return reply.code(400).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Ocurrió un error en el servidor al resetear contraseña.' });
    }
};