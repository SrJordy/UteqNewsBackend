import { z } from 'zod';

// ===== VALIDACIÓN DE CONTRASEÑAS =====
export const passwordSchema = z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula')
    .regex(/[a-z]/, 'La contraseña debe tener al menos una minúscula')
    .regex(/[0-9]/, 'La contraseña debe tener al menos un número');

// Contraseña más simple para desarrollo (6 chars mínimo)
export const passwordSchemaSimple = z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres');

// ===== VALIDACIÓN DE EMAIL =====
export const emailSchema = z.string()
    .email('El email no es válido')
    .transform(val => val.toLowerCase().trim());

// ===== AUTENTICACIÓN =====
export const registerSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50),
    apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').max(50),
    email: emailSchema,
    password: passwordSchemaSimple, // Usar passwordSchema para producción
    carrera: z.string().optional(),
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'La contraseña es requerida'),
});

export const verifyEmailSchema = z.object({
    email: emailSchema,
    code: z.string().min(4, 'El código es requerido'),
});

export const resetPasswordSchema = z.object({
    email: emailSchema,
    code: z.string().min(1, 'El código es requerido'),
    newPassword: passwordSchemaSimple,
});

// ===== NOTICIAS =====
export const noticiaSchema = z.object({
    titulo: z.string()
        .min(5, 'El título debe tener al menos 5 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres'),
    contenido: z.string()
        .min(20, 'El contenido debe tener al menos 20 caracteres'),
    categoria: z.string().optional(),
    urlExterna: z.string().url().optional().or(z.literal('')),
    destacada: z.boolean().optional(),
});

export const noticiaUpdateSchema = noticiaSchema.partial();

// ===== TIKTOKS =====
export const tikTokSchema = z.object({
    titulo: z.string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(100, 'El título no puede exceder 100 caracteres'),
    descripcion: z.string().optional(),
    tiktokUrl: z.string()
        .url('La URL de TikTok no es válida')
        .refine(url => url.includes('tiktok.com'), 'Debe ser una URL de TikTok'),
});

// ===== REVISTAS =====
export const revistaSchema = z.object({
    titulo: z.string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(150, 'El título no puede exceder 150 caracteres'),
    anio: z.number()
        .int()
        .min(2000, 'El año debe ser mayor a 2000')
        .max(2100, 'El año no puede exceder 2100'),
    mes: z.string().min(1, 'El mes es requerido'),
});

// ===== FAQs =====
export const faqSchema = z.object({
    carrera: z.string().min(1, 'La carrera es requerida'),
    categoria: z.string().min(1, 'La categoría es requerida'),
    pregunta: z.string()
        .min(10, 'La pregunta debe tener al menos 10 caracteres')
        .max(500, 'La pregunta no puede exceder 500 caracteres'),
    respuesta: z.string()
        .min(10, 'La respuesta debe tener al menos 10 caracteres'),
});

// ===== ADMIN REGISTRO =====
export const adminRegisterSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50),
    apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').max(50),
    email: emailSchema,
});

// ===== HELPER PARA VALIDAR =====
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.issues.map(e => e.message).join(', ');
        throw new Error(errors);
    }
    return result.data;
}
