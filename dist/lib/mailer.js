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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const GMAIL_USER = 'uteqnews@gmail.com';
const GMAIL_APP_PASSWORD = 'jvwz qbay dptq pnkz';
// Configuración que funciona en Render
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para 587
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});
console.log('📧 SMTP Transporter inicializado - Host: smtp.gmail.com, Puerto: 587');
/**
 * Envía un correo electrónico de verificación con un código.
 */
const sendVerificationEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: `"UTEQ News" <${GMAIL_USER}>`,
            to: to,
            subject: '🔐 Código de Verificación - UTEQ News',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #00897B 0%, #004D40 100%); padding: 30px; text-align: center;">
                                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎓 UTEQ News</h1>
                                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Universidad Técnica Estatal de Quevedo</p>
                                        </td>
                                    </tr>
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 30px;">
                                            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 22px; text-align: center;">Verificación de Correo</h2>
                                            <p style="color: #666; font-size: 16px; line-height: 1.6; text-align: center;">
                                                Gracias por registrarte en UTEQ News. Para completar tu registro, usa el siguiente código:
                                            </p>
                                            <!-- Code Box -->
                                            <div style="background: linear-gradient(135deg, #00897B 0%, #00695C 100%); border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
                                                <span style="font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 8px;">${code}</span>
                                            </div>
                                            <p style="color: #888; font-size: 14px; text-align: center;">
                                                ⏱️ Este código es válido por <strong>5 minutos</strong>
                                            </p>
                                            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                                            <p style="color: #999; font-size: 12px; text-align: center;">
                                                Si no solicitaste este código, puedes ignorar este correo de forma segura.
                                            </p>
                                        </td>
                                    </tr>
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                                            <p style="color: #999; font-size: 12px; margin: 0;">
                                                © ${new Date().getFullYear()} UTEQ News - Todos los derechos reservados
                                            </p>
                                            <p style="color: #ccc; font-size: 11px; margin: 10px 0 0 0;">
                                                Powered by Hellheim System
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        };
        yield transporter.sendMail(mailOptions);
        console.log(`✉️ Correo de verificación enviado a ${to}`);
    }
    catch (error) {
        console.error(`❌ Error al enviar correo de verificación a ${to}:`, error);
        throw new Error('No se pudo enviar el correo de verificación.');
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
/**
 * Envía un correo electrónico para resetear contraseña.
 */
const sendPasswordResetEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: `"UTEQ News" <${GMAIL_USER}>`,
            to: to,
            subject: '🔑 Restablecer Contraseña - UTEQ News',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #FF6B6B 0%, #C0392B 100%); padding: 30px; text-align: center;">
                                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔑 Restablecer Contraseña</h1>
                                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">UTEQ News</p>
                                        </td>
                                    </tr>
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 30px;">
                                            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 22px; text-align: center;">Código de Recuperación</h2>
                                            <p style="color: #666; font-size: 16px; line-height: 1.6; text-align: center;">
                                                Hemos recibido una solicitud para restablecer tu contraseña. Usa el siguiente código:
                                            </p>
                                            <!-- Code Box -->
                                            <div style="background: linear-gradient(135deg, #FF6B6B 0%, #E74C3C 100%); border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
                                                <span style="font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 8px;">${code}</span>
                                            </div>
                                            <p style="color: #888; font-size: 14px; text-align: center;">
                                                ⏱️ Este código es válido por <strong>1 hora</strong>
                                            </p>
                                            <div style="background-color: #FFF9C4; border-left: 4px solid #FFC107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                                <p style="color: #856404; font-size: 13px; margin: 0;">
                                                    ⚠️ <strong>Importante:</strong> Si no solicitaste este cambio, te recomendamos cambiar tu contraseña inmediatamente.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                                            <p style="color: #999; font-size: 12px; margin: 0;">
                                                © ${new Date().getFullYear()} UTEQ News - Todos los derechos reservados
                                            </p>
                                            <p style="color: #ccc; font-size: 11px; margin: 10px 0 0 0;">
                                                Powered by Hellheim System
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        };
        yield transporter.sendMail(mailOptions);
        console.log(`✉️ Correo de recuperación enviado a ${to}`);
    }
    catch (error) {
        console.error(`❌ Error al enviar correo de recuperación a ${to}:`, error);
        throw new Error('No se pudo enviar el correo de recuperación.');
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
