"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegisterSchema = exports.faqSchema = exports.revistaSchema = exports.tikTokSchema = exports.noticiaUpdateSchema = exports.noticiaSchema = exports.resetPasswordSchema = exports.verifyEmailSchema = exports.loginSchema = exports.registerSchema = exports.emailSchema = exports.passwordSchemaSimple = exports.passwordSchema = void 0;
exports.validateInput = validateInput;
const zod_1 = require("zod");
// ===== VALIDACIÓN DE CONTRASEÑAS =====
exports.passwordSchema = zod_1.z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula')
    .regex(/[a-z]/, 'La contraseña debe tener al menos una minúscula')
    .regex(/[0-9]/, 'La contraseña debe tener al menos un número');
// Contraseña más simple para desarrollo (6 chars mínimo)
exports.passwordSchemaSimple = zod_1.z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres');
// ===== VALIDACIÓN DE EMAIL =====
exports.emailSchema = zod_1.z.string()
    .email('El email no es válido')
    .transform(val => val.toLowerCase().trim());
// ===== AUTENTICACIÓN =====
exports.registerSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50),
    apellido: zod_1.z.string().min(2, 'El apellido debe tener al menos 2 caracteres').max(50),
    email: exports.emailSchema,
    password: exports.passwordSchemaSimple, // Usar passwordSchema para producción
    carrera: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z.string().min(1, 'La contraseña es requerida'),
});
exports.verifyEmailSchema = zod_1.z.object({
    email: exports.emailSchema,
    code: zod_1.z.string().min(4, 'El código es requerido'),
});
exports.resetPasswordSchema = zod_1.z.object({
    email: exports.emailSchema,
    code: zod_1.z.string().min(1, 'El código es requerido'),
    newPassword: exports.passwordSchemaSimple,
});
// ===== NOTICIAS =====
exports.noticiaSchema = zod_1.z.object({
    titulo: zod_1.z.string()
        .min(5, 'El título debe tener al menos 5 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres'),
    contenido: zod_1.z.string()
        .min(20, 'El contenido debe tener al menos 20 caracteres'),
    categoria: zod_1.z.string().optional(),
    urlExterna: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
    destacada: zod_1.z.boolean().optional(),
});
exports.noticiaUpdateSchema = exports.noticiaSchema.partial();
// ===== TIKTOKS =====
exports.tikTokSchema = zod_1.z.object({
    titulo: zod_1.z.string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(100, 'El título no puede exceder 100 caracteres'),
    descripcion: zod_1.z.string().optional(),
    tiktokUrl: zod_1.z.string()
        .url('La URL de TikTok no es válida')
        .refine(url => url.includes('tiktok.com'), 'Debe ser una URL de TikTok'),
});
// ===== REVISTAS =====
exports.revistaSchema = zod_1.z.object({
    titulo: zod_1.z.string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(150, 'El título no puede exceder 150 caracteres'),
    anio: zod_1.z.number()
        .int()
        .min(2000, 'El año debe ser mayor a 2000')
        .max(2100, 'El año no puede exceder 2100'),
    mes: zod_1.z.string().min(1, 'El mes es requerido'),
});
// ===== FAQs =====
exports.faqSchema = zod_1.z.object({
    carrera: zod_1.z.string().min(1, 'La carrera es requerida'),
    categoria: zod_1.z.string().min(1, 'La categoría es requerida'),
    pregunta: zod_1.z.string()
        .min(10, 'La pregunta debe tener al menos 10 caracteres')
        .max(500, 'La pregunta no puede exceder 500 caracteres'),
    respuesta: zod_1.z.string()
        .min(10, 'La respuesta debe tener al menos 10 caracteres'),
});
// ===== ADMIN REGISTRO =====
exports.adminRegisterSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50),
    apellido: zod_1.z.string().min(2, 'El apellido debe tener al menos 2 caracteres').max(50),
    email: exports.emailSchema,
});
// ===== HELPER PARA VALIDAR =====
function validateInput(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.issues.map(e => e.message).join(', ');
        throw new Error(errors);
    }
    return result.data;
}
