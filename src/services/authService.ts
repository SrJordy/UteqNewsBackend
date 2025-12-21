
import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcryptjs';
import { RegisterUserInput, LoginUserInput, UpdateUserInput, PreferenceInput, RequestPasswordResetInput, ResetPasswordInput } from './authSchemas';
import { sendVerificationEmail, sendPasswordResetEmail } from '../lib/mailer';
import { v4 as uuidv4 } from 'uuid'; // Para generar tokens únicos

// Función para generar un código de 6 dígitos (para verificación de email)
const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerUser = async (input: RegisterUserInput) => {
    // Determinar el rol basado en el email
    let assignedRol: string;
    if (input.email.endsWith('@uteq.edu.ec')) {
        assignedRol = 'UTEQSino';
    } else {
        assignedRol = 'Invitado';
    }

    // Verificar si el email ya está en uso y verificado
    const existingVerifiedUser = await prisma.usuario.findFirst({
        where: { email: input.email, verificado: true },
    });

    if (existingVerifiedUser) {
        throw new Error('El correo electrónico ya está registrado y verificado.');
    }

    // Si existe un usuario no verificado, lo actualizamos o creamos uno nuevo
    let user = await prisma.usuario.findFirst({
        where: { email: input.email, verificado: false },
    });

    const hashedPassword = await bcrypt.hash(input.password, 10);

    if (user) {
        // Actualizar usuario existente no verificado
        user = await prisma.usuario.update({
            where: { id: user.id },
            data: {
                nombre: input.nombre,
                apellido: input.apellido,
                password: hashedPassword,
                rol: assignedRol, // Asignar el rol determinado
            },
        });
    } else {
        // Crear nuevo usuario no verificado
        user = await prisma.usuario.create({
            data: {
                nombre: input.nombre,
                apellido: input.apellido,
                email: input.email,
                password: hashedPassword,
                rol: assignedRol, // Asignar el rol determinado
                verificado: false, // Por defecto, no verificado
            },
        });
    }

    // Generar y guardar código de verificación
    const verificationCode = generateVerificationCode();
    const expiryTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos a partir de ahora

    // Eliminar códigos anteriores activos para este usuario
    await prisma.userCode.deleteMany({
        where: { userId: user.id, status: 'active' },
    });

    await prisma.userCode.create({
        data: {
            userId: user.id,
            code: verificationCode,
            expiryTime: expiryTime,
            status: 'active',
        },
    });

    // Intentar enviar correo de verificación (no bloquear registro si falla)
    let emailSent = false;
    try {
        await sendVerificationEmail(user.email, verificationCode);
        emailSent = true;
        console.log(`✅ Email de verificación enviado a ${user.email}`);
    } catch (emailError) {
        console.error(`⚠️ No se pudo enviar email a ${user.email}, pero el usuario fue registrado. Código: ${verificationCode}`);
        // El usuario puede solicitar reenvío del código más tarde
    }

    // Omitir la contraseña del objeto de usuario devuelto
    const { password, ...userWithoutPassword } = user;

    if (emailSent) {
        return { ...userWithoutPassword, message: 'Correo de verificación enviado. Por favor, verifica tu bandeja de entrada.', verificationCode: null };
    } else {
        // Si el email falló, devolver el código directamente para que la app lo muestre
        return { ...userWithoutPassword, message: 'Usuario registrado. El servicio de correo no está disponible temporalmente.', verificationCode: verificationCode };
    }
};

export const verifyEmail = async (email: string, code: string) => {
    const user = await prisma.usuario.findUnique({
        where: { email: email },
    });

    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    const userCode = await prisma.userCode.findFirst({
        where: {
            userId: user.id,
            code: code,
            status: 'active',
            expiryTime: { gte: new Date() }, // Código no expirado
        },
        orderBy: { createdAt: 'desc' }, // Obtener el código más reciente
    });

    if (!userCode) {
        throw new Error('Código de verificación inválido o expirado.');
    }

    // Marcar el código como usado
    await prisma.userCode.update({
        where: { id: userCode.id },
        data: { status: 'used' },
    });

    // Marcar al usuario como verificado
    const updatedUser = await prisma.usuario.update({
        where: { id: user.id },
        data: { verificado: true },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return { ...userWithoutPassword, message: 'Correo verificado exitosamente.' };
};

export const loginUser = async (input: LoginUserInput) => {
    const user = await prisma.usuario.findUnique({
        where: { email: input.email },
    });

    if (!user) {
        throw new Error('Credenciales inválidas.');
    }

    // Verificar si el usuario está verificado
    if (!user.verificado) {
        throw new Error('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
    }

    // Comparar la contraseña hasheada
    const passwordMatch = await bcrypt.compare(input.password, user.password);

    if (!passwordMatch) {
        throw new Error('Credenciales inválidas.');
    }

    // Omitir la contraseña del objeto de usuario devuelto
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const updateUser = async (email: string, updateData: UpdateUserInput) => {
    const user = await prisma.usuario.findUnique({
        where: { email: email },
    });

    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    const dataToUpdate: any = { ...updateData };

    if (updateData.password) {
        dataToUpdate.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await prisma.usuario.update({
        where: { id: user.id },
        data: dataToUpdate,
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
};

export const addPreference = async (email: string, careerName: string) => {
    const user = await prisma.usuario.findUnique({
        where: { email: email },
    });

    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    // Buscar o crear la carrera por su nombre (que ahora es el apiId String)
    const career = await prisma.carrera.upsert({
        where: { apiId: careerName }, // Usamos careerName como apiId
        update: {},
        create: {
            apiId: careerName,
            nombre: careerName, // El nombre de la carrera es el mismo que el apiId por ahora
        },
    });

    // Verificar si la preferencia ya existe
    const existingPreference = await prisma.preferenciaUsuarioCarrera.findUnique({
        where: {
            usuarioId_carreraId: {
                usuarioId: user.id,
                carreraId: career.id,
            },
        },
    });

    if (existingPreference) {
        throw new Error('Esta preferencia ya ha sido añadida.');
    }

    // Añadir la preferencia
    await prisma.preferenciaUsuarioCarrera.create({
        data: {
            usuarioId: user.id,
            carreraId: career.id,
        },
    });

    return { message: `Preferencia por ${careerName} añadida exitosamente.` };
};

export const removePreference = async (email: string, careerName: string) => {
    const user = await prisma.usuario.findUnique({
        where: { email: email },
    });

    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    const career = await prisma.carrera.findUnique({
        where: { apiId: careerName },
    });

    if (!career) {
        throw new Error('Carrera no encontrada.');
    }

    // Eliminar la preferencia
    const deleted = await prisma.preferenciaUsuarioCarrera.delete({
        where: {
            usuarioId_carreraId: {
                usuarioId: user.id,
                carreraId: career.id,
            },
        },
    });

    if (!deleted) {
        throw new Error('Preferencia no encontrada para eliminar.');
    }

    return { message: `Preferencia por ${careerName} eliminada exitosamente.` };
};

export const getPreferences = async (email: string) => {
    const user = await prisma.usuario.findUnique({
        where: { email: email },
        include: {
            preferencias: {
                include: {
                    carrera: true, // Incluir los detalles de la carrera
                },
            },
        },
    });

    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    // Mapear las preferencias para devolver solo los nombres de las carreras
    const preferredCareers = user.preferencias.map(p => p.carrera.nombre);

    return { email: user.email, preferences: preferredCareers };
};

export const requestPasswordReset = async (email: string) => {
    const user = await prisma.usuario.findUnique({
        where: { email: email },
    });

    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    const resetToken = uuidv4(); // Generar un token único
    const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validez

    // Eliminar tokens de reseteo de contraseña anteriores activos para este usuario
    await prisma.userCode.deleteMany({
        where: { userId: user.id, status: 'password_reset' },
    });

    await prisma.userCode.create({
        data: {
            userId: user.id,
            code: resetToken,
            expiryTime: expiryTime,
            status: 'password_reset',
        },
    });

    // Enviar correo con el código de reseteo usando plantilla específica
    let emailSent = false;
    try {
        await sendPasswordResetEmail(user.email, resetToken);
        emailSent = true;
        console.log(`✅ Email de reset enviado a ${user.email}`);
    } catch (emailError) {
        console.error(`⚠️ No se pudo enviar reset email a ${user.email}. Token: ${resetToken}`);
    }

    if (emailSent) {
        return {
            message: 'Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña.',
            resetToken: null
        };
    } else {
        // Fallback para cuando falla el email en Render
        return {
            message: 'Solicitud recibida. El servicio de correo no está disponible temporalmente.',
            resetToken: resetToken
        };
    }
};

export const resetPassword = async (input: ResetPasswordInput) => {
    const user = await prisma.usuario.findUnique({
        where: { email: input.email },
    });

    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    const userCode = await prisma.userCode.findFirst({
        where: {
            userId: user.id,
            code: input.token,
            status: 'password_reset',
            expiryTime: { gte: new Date() }, // Token no expirado
        },
        orderBy: { createdAt: 'desc' }, // Obtener el token más reciente
    });

    if (!userCode) {
        throw new Error('Token de reseteo de contraseña inválido o expirado.');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(input.newPassword, 10);

    // Actualizar la contraseña del usuario
    const updatedUser = await prisma.usuario.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    // Marcar el token como usado
    await prisma.userCode.update({
        where: { id: userCode.id },
        data: { status: 'used' },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return { ...userWithoutPassword, message: 'Contraseña restablecida exitosamente.' };
};
