"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const GMAIL_USER = 'uteqnews@gmail.com';
const GMAIL_APP_PASSWORD = 'jvwz qbay dptq pnkz';
// Configuración del transportador de Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
    },
});
/**
 * Envía un correo electrónico de verificación con un código.
 * @param to - Dirección de correo electrónico del destinatario.
 * @param code - Código de verificación a enviar.
 */
const sendVerificationEmail = async (to, code) => {
    try {
        const mailOptions = {
            from: GMAIL_USER,
            to: to,
            subject: 'Código de Verificación UTEQNews',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Verificación de Correo Electrónico</h2>
                    <p>Gracias por registrarte en UTEQNews. Para completar tu registro, por favor usa el siguiente código de verificación:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #0056b3;">${code}</p>
                    <p>Este código es válido por 5 minutos.</p>
                    <p>Si no solicitaste este código, puedes ignorar este correo.</p>
                    <hr>
                    <p style="font-size: 0.8em; color: #666;">Equipo de UTEQNews</p>
                </div>
            `,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Correo de verificación enviado a ${to}`);
    }
    catch (error) {
        console.error(`Error al enviar correo de verificación a ${to}:`, error);
        throw new Error('No se pudo enviar el correo de verificación.');
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
