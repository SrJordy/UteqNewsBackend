import { FastifyInstance } from 'fastify';
import {
    getNoticiasHandler,
    createNoticiaHandler,
    updateNoticiaHandler,
    deleteNoticiaHandler,
    uploadNoticiaImagenHandler,
    uploadEvidenciasHandler,
    deleteEvidenciaHandler,
    getTikToksHandler,
    createTikTokHandler,
    deleteTikTokHandler,
    uploadTikTokPortadaHandler,
    getRevistasHandler,
    deleteRevistaHandler,
    createRevistaHandler,
    getUsuariosHandler,
    getActividadUsuarioHandler,
    toggleUsuarioEstadoHandler,
    registerAdminHandler,
    changePasswordHandler,
    deleteUsuarioHandler
} from '../controllers/adminController';
import {
    getFaqsHandler,
    getFaqByIdHandler,
    createFaqHandler,
    updateFaqHandler,
    deleteFaqHandler,
    syncFaqsHandler
} from '../controllers/faqController';
import { requireAdminAuth } from '../middleware/authMiddleware';

/**
 * Rutas de administración
 * Todas requieren autenticación de admin/superadmin via JWT cookies
 */
const adminRoutes = async (server: FastifyInstance) => {
    // Aplicar middleware de autenticación a TODAS las rutas de este plugin
    server.addHook('preHandler', requireAdminAuth);

    // === NOTICIAS ===
    server.get('/noticias', getNoticiasHandler);
    server.post('/noticias', createNoticiaHandler);
    server.put('/noticias/:id', updateNoticiaHandler);
    server.delete('/noticias/:id', deleteNoticiaHandler);
    server.post('/noticias/:id/imagen', uploadNoticiaImagenHandler);
    server.post('/noticias/:id/evidencias', uploadEvidenciasHandler);
    server.delete('/noticias/:id/evidencias', deleteEvidenciaHandler);

    // === TIKTOKS ===
    server.get('/tiktoks', getTikToksHandler);
    server.post('/tiktoks', createTikTokHandler);
    server.delete('/tiktoks/:id', deleteTikTokHandler);
    server.post('/tiktoks/:id/portada', uploadTikTokPortadaHandler);

    // === REVISTAS ===
    server.get('/revistas', getRevistasHandler);
    server.post('/revistas', createRevistaHandler);
    server.delete('/revistas/:id', deleteRevistaHandler);

    // === USUARIOS ===
    server.get('/usuarios', getUsuariosHandler);
    server.get('/usuarios/:id/actividad', getActividadUsuarioHandler);
    server.put('/usuarios/:id/estado', toggleUsuarioEstadoHandler);
    server.put('/usuarios/:id/cambiar-password', changePasswordHandler);
    server.delete('/usuarios/:id', deleteUsuarioHandler);
    server.post('/usuarios/register-admin', registerAdminHandler);

    // === FAQs CHATBOT ===
    server.get('/faqs', getFaqsHandler);
    server.get('/faqs/:id', getFaqByIdHandler);
    server.post('/faqs', createFaqHandler);
    server.post('/faqs/sync', syncFaqsHandler);
    server.put('/faqs/:id', updateFaqHandler);
    server.delete('/faqs/:id', deleteFaqHandler);
};

export default adminRoutes;
