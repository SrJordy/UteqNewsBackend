"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreferences = exports.removePreference = exports.addPreference = exports.updateUser = exports.loginUser = exports.verifyEmail = exports.registerUser = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt = __importStar(require("bcryptjs"));
const mailer_1 = require("../lib/mailer");
// Función para generar un código de 6 dígitos
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const registerUser = async (input) => {
    // Determinar el rol basado en el email
    let assignedRol;
    if (input.email.endsWith('@uteq.edu.ec')) {
        assignedRol = 'UTEQSino';
    }
    else {
        assignedRol = 'Invitado';
    }
    // Verificar si el email ya está en uso y verificado
    const existingVerifiedUser = await prisma_1.prisma.usuario.findUnique({
        where: { email: input.email, verificado: true },
    });
    if (existingVerifiedUser) {
        throw new Error('El correo electrónico ya está registrado y verificado.');
    }
    // Si existe un usuario no verificado, lo actualizamos o creamos uno nuevo
    let user = await prisma_1.prisma.usuario.findUnique({
        where: { email: input.email, verificado: false },
    });
    const hashedPassword = await bcrypt.hash(input.password, 10);
    if (user) {
        // Actualizar usuario existente no verificado
        user = await prisma_1.prisma.usuario.update({
            where: { id: user.id },
            data: {
                nombre: input.nombre,
                apellido: input.apellido,
                password: hashedPassword,
                rol: assignedRol, // Asignar el rol determinado
            },
        });
    }
    else {
        // Crear nuevo usuario no verificado
        user = await prisma_1.prisma.usuario.create({
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
    await prisma_1.prisma.userCode.deleteMany({
        where: { userId: user.id, status: 'active' },
    });
    await prisma_1.prisma.userCode.create({
        data: {
            userId: user.id,
            code: verificationCode,
            expiryTime: expiryTime,
            status: 'active',
        },
    });
    // Enviar correo de verificación
    await (0, mailer_1.sendVerificationEmail)(user.email, verificationCode);
    // Omitir la contraseña del objeto de usuario devuelto
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, message: 'Correo de verificación enviado. Por favor, verifica tu bandeja de entrada.' };
};
exports.registerUser = registerUser;
const verifyEmail = async (email, code) => {
    const user = await prisma_1.prisma.usuario.findUnique({
        where: { email: email },
    });
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }
    const userCode = await prisma_1.prisma.userCode.findFirst({
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
    await prisma_1.prisma.userCode.update({
        where: { id: userCode.id },
        data: { status: 'used' },
    });
    // Marcar al usuario como verificado
    const updatedUser = await prisma_1.prisma.usuario.update({
        where: { id: user.id },
        data: { verificado: true },
    });
    const { password, ...userWithoutPassword } = updatedUser;
    return { ...userWithoutPassword, message: 'Correo verificado exitosamente.' };
};
exports.verifyEmail = verifyEmail;
const loginUser = async (input) => {
    const user = await prisma_1.prisma.usuario.findUnique({
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
exports.loginUser = loginUser;
const updateUser = async (email, updateData) => {
    const user = await prisma_1.prisma.usuario.findUnique({
        where: { email: email },
    });
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }
    const dataToUpdate = { ...updateData };
    if (updateData.password) {
        dataToUpdate.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedUser = await prisma_1.prisma.usuario.update({
        where: { id: user.id },
        data: dataToUpdate,
    });
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
};
exports.updateUser = updateUser;
const addPreference = async (email, careerName) => {
    const user = await prisma_1.prisma.usuario.findUnique({
        where: { email: email },
    });
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }
    // Buscar o crear la carrera por su nombre (que ahora es el apiId String)
    const career = await prisma_1.prisma.carrera.upsert({
        where: { apiId: careerName }, // Usamos careerName como apiId
        update: {},
        create: {
            apiId: careerName,
            nombre: careerName, // El nombre de la carrera es el mismo que el apiId por ahora
        },
    });
    // Verificar si la preferencia ya existe
    const existingPreference = await prisma_1.prisma.preferenciaUsuarioCarrera.findUnique({
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
    await prisma_1.prisma.preferenciaUsuarioCarrera.create({
        data: {
            usuarioId: user.id,
            carreraId: career.id,
        },
    });
    return { message: `Preferencia por ${careerName} añadida exitosamente.` };
};
exports.addPreference = addPreference;
const removePreference = async (email, careerName) => {
    const user = await prisma_1.prisma.usuario.findUnique({
        where: { email: email },
    });
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }
    const career = await prisma_1.prisma.carrera.findUnique({
        where: { apiId: careerName },
    });
    if (!career) {
        throw new Error('Carrera no encontrada.');
    }
    // Eliminar la preferencia
    const deleted = await prisma_1.prisma.preferenciaUsuarioCarrera.delete({
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
exports.removePreference = removePreference;
const getPreferences = async (email) => {
    const user = await prisma_1.prisma.usuario.findUnique({
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
exports.getPreferences = getPreferences;
