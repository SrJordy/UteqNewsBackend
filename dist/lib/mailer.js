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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class GmailService {
    constructor() {
        // Cargar configuración desde variables de entorno
        this.userEmail = process.env.GMAIL_USER || 'uteqnews@gmail.com';
        const appPassword = process.env.GMAIL_APP_PASSWORD || '';
        // Validar credenciales
        if (!appPassword) {
            console.error('❌ Error: GMAIL_APP_PASSWORD no está configurada en .env');
        }
        console.log(`📧 Configurando GmailService con usuario: ${this.userEmail}`);
        this.initializeTransporter(appPassword);
    }
    initializeTransporter(appPassword) {
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: this.userEmail,
                pass: appPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        console.log('✅ Transporter SMTP inicializado correctamente (smtp.gmail.com:587)');
    }
    /**
     * Método genérico para enviar correos
     */
    sendEmail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const senderName = options.fromName || 'UTEQ News';
                const senderEmail = options.from || this.userEmail;
                const mailOptions = {
                    from: `"${senderName}" <${senderEmail}>`,
                    to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
                    subject: options.subject,
                    text: options.text,
                    html: options.html,
                    headers: {
                        'X-Priority': '1', // Alta prioridad
                        'Organisation': 'Universidad Técnica Estatal de Quevedo'
                    }
                };
                const info = yield this.transporter.sendMail(mailOptions);
                console.log(`✅ Email enviado exitosamente a ${options.to}. ID: ${info.messageId}`);
                return {
                    success: true,
                    messageId: info.messageId
                };
            }
            catch (error) {
                console.error(`❌ Error enviando email a ${options.to}:`, error.message);
                return {
                    success: false,
                    error: error.message
                };
            }
        });
    }
    /**
     * Enviar código de verificación de registro
     */
    sendVerificationEmail(to, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlContent = `
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
        `;
            return this.sendEmail({
                to,
                subject: '🔐 Código de Verificación - UTEQ News',
                html: htmlContent,
                text: `Tu código de verificación es: ${code}`
            });
        });
    }
    /**
     * Enviar correo para restablecer contraseña
     */
    sendPasswordResetEmail(to, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlContent = `
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
                                <td style="background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%); padding: 30px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔑 UTEQ News</h1>
                                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Recuperación de Cuenta</p>
                                </td>
                            </tr>
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px 30px;">
                                    <h2 style="color: #333; margin: 0 0 20px 0; font-size: 22px; text-align: center;">Restablecer Contraseña</h2>
                                    <p style="color: #666; font-size: 16px; line-height: 1.6; text-align: center;">
                                        Has solicitado restablecer tu contraseña. Usa el siguiente token para continuar:
                                    </p>
                                    <!-- Code Box -->
                                    <div style="background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%); border-radius: 12px; padding: 20px; text-align: center; margin: 30px 0; word-break: break-all;">
                                        <span style="font-size: 20px; font-weight: bold; color: #ffffff; font-family: monospace;">${code}</span>
                                    </div>
                                    <p style="color: #888; font-size: 14px; text-align: center;">
                                        ⏱️ Este enlace es válido por <strong>1 hora</strong>
                                    </p>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                                    <p style="color: #999; font-size: 12px; margin: 0;">
                                        © ${new Date().getFullYear()} UTEQ News
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;
            return this.sendEmail({
                to,
                subject: '🔑 Restablecer Contraseña - UTEQ News',
                html: htmlContent,
                text: `Tu token para restablecer contraseña es: ${code}`
            });
        });
    }
}
// Exportar una instancia única (Singleton)
const gmailService = new GmailService();
exports.sendVerificationEmail = gmailService.sendVerificationEmail.bind(gmailService);
exports.sendPasswordResetEmail = gmailService.sendPasswordResetEmail.bind(gmailService);
exports.default = gmailService;
