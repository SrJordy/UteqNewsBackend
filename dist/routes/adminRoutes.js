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
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("../controllers/adminController");
const faqController_1 = require("../controllers/faqController");
const authMiddleware_1 = require("../middleware/authMiddleware");
/**
 * Rutas de administración
 * Todas requieren autenticación de admin/superadmin via JWT cookies
 */
const adminRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    // Aplicar middleware de autenticación a TODAS las rutas de este plugin
    server.addHook('preHandler', authMiddleware_1.requireAdminAuth);
    // === NOTICIAS ===
    server.get('/noticias', adminController_1.getNoticiasHandler);
    server.post('/noticias', adminController_1.createNoticiaHandler);
    server.put('/noticias/:id', adminController_1.updateNoticiaHandler);
    server.delete('/noticias/:id', adminController_1.deleteNoticiaHandler);
    server.post('/noticias/:id/imagen', adminController_1.uploadNoticiaImagenHandler);
    server.post('/noticias/:id/evidencias', adminController_1.uploadEvidenciasHandler);
    server.delete('/noticias/:id/evidencias', adminController_1.deleteEvidenciaHandler);
    // === TIKTOKS ===
    server.get('/tiktoks', adminController_1.getTikToksHandler);
    server.post('/tiktoks', adminController_1.createTikTokHandler);
    server.delete('/tiktoks/:id', adminController_1.deleteTikTokHandler);
    server.post('/tiktoks/:id/portada', adminController_1.uploadTikTokPortadaHandler);
    // === REVISTAS ===
    server.get('/revistas', adminController_1.getRevistasHandler);
    server.post('/revistas', adminController_1.createRevistaHandler);
    server.delete('/revistas/:id', adminController_1.deleteRevistaHandler);
    // === USUARIOS ===
    server.get('/usuarios', adminController_1.getUsuariosHandler);
    server.get('/usuarios/:id/actividad', adminController_1.getActividadUsuarioHandler);
    server.put('/usuarios/:id/estado', adminController_1.toggleUsuarioEstadoHandler);
    server.put('/usuarios/:id/cambiar-password', adminController_1.changePasswordHandler);
    server.delete('/usuarios/:id', adminController_1.deleteUsuarioHandler);
    server.post('/usuarios/register-admin', adminController_1.registerAdminHandler);
    // === FAQs CHATBOT ===
    server.get('/faqs', faqController_1.getFaqsHandler);
    server.get('/faqs/:id', faqController_1.getFaqByIdHandler);
    server.post('/faqs', faqController_1.createFaqHandler);
    server.post('/faqs/sync', faqController_1.syncFaqsHandler);
    server.put('/faqs/:id', faqController_1.updateFaqHandler);
    server.delete('/faqs/:id', faqController_1.deleteFaqHandler);
});
exports.default = adminRoutes;
