import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcryptjs';
import { RegisterUserInput, LoginUserInput, UpdateUserInput, PreferenceInput } from './auth.schemas';
import { sendVerificationEmail } from '../lib/mailer';

// Función para generar un código de 6 dígitos
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
    const existingVerifiedUser = await prisma.usuario.findUnique({
        where: { email: input.email, verificado: true },
    });

    if (existingVerifiedUser) {
        throw new Error('El correo electrónico ya está registrado y verificado.');
    }

    // Si existe un usuario no verificado, lo actualizamos o creamos uno nuevo
    let user = await prisma.usuario.findUnique({
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

    // Enviar correo de verificación
    await sendVerificationEmail(user.email, verificationCode);

    // Omitir la contraseña del objeto de usuario devuelto
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, message: 'Correo de verificación enviado. Por favor, verifica tu bandeja de entrada.' };
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