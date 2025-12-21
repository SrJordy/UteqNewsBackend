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
exports.syncFaqsHandler = exports.deleteFaqHandler = exports.updateFaqHandler = exports.createFaqHandler = exports.getFaqByIdHandler = exports.getFaqsHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vectorService_1 = require("../services/vectorService");
const FAQ_PATH = path_1.default.join(__dirname, '../../data/faq_carreras.json');
// Helpers
const loadFaqs = () => {
    try {
        if (fs_1.default.existsSync(FAQ_PATH)) {
            const data = fs_1.default.readFileSync(FAQ_PATH, 'utf-8');
            return JSON.parse(data);
        }
    }
    catch (error) {
        console.error('Error cargando FAQs:', error);
    }
    return { software: [] };
};
const saveFaqs = (data) => {
    fs_1.default.writeFileSync(FAQ_PATH, JSON.stringify(data, null, 2), 'utf-8');
};
const generateId = (carrera) => {
    const prefix = carrera === 'software' ? 'soft' : carrera.substring(0, 4);
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `${prefix}_${timestamp}_${random}`;
};
// GET /api/admin/faqs - Listar FAQs con paginación y búsqueda
const getFaqsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const search = (request.query.search || '').toLowerCase().trim();
        const skip = (page - 1) * limit;
        const faqData = loadFaqs();
        let allFaqs = [];
        // Recopilar FAQs de todas las carreras
        for (const carrera of Object.keys(faqData)) {
            allFaqs = [...allFaqs, ...faqData[carrera]];
        }
        // Filtrar por búsqueda
        if (search) {
            allFaqs = allFaqs.filter(faq => faq.pregunta.toLowerCase().includes(search) ||
                faq.respuesta.toLowerCase().includes(search) ||
                faq.categoria.toLowerCase().includes(search));
        }
        // Paginación
        const total = allFaqs.length;
        const paginatedFaqs = allFaqs.slice(skip, skip + limit);
        return reply.code(200).send({
            data: paginatedFaqs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    }
    catch (error) {
        console.error('Error al obtener FAQs:', error);
        return reply.code(500).send({ error: 'Error al obtener FAQs' });
    }
});
exports.getFaqsHandler = getFaqsHandler;
// GET /api/admin/faqs/:id - Obtener FAQ por ID
const getFaqByIdHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const faqData = loadFaqs();
        for (const carrera of Object.keys(faqData)) {
            const faq = faqData[carrera].find(f => f.id === id);
            if (faq) {
                return reply.code(200).send(faq);
            }
        }
        return reply.code(404).send({ error: 'FAQ no encontrada' });
    }
    catch (error) {
        console.error('Error al obtener FAQ:', error);
        return reply.code(500).send({ error: 'Error al obtener FAQ' });
    }
});
exports.getFaqByIdHandler = getFaqByIdHandler;
// POST /api/admin/faqs - Crear nueva FAQ
const createFaqHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carrera, categoria, pregunta, respuesta } = request.body;
        if (!carrera || !categoria || !pregunta || !respuesta) {
            return reply.code(400).send({ error: 'Todos los campos son requeridos' });
        }
        const faqData = loadFaqs();
        const newFaq = {
            id: generateId(carrera),
            carrera,
            categoria,
            pregunta,
            respuesta
        };
        if (!faqData[carrera]) {
            faqData[carrera] = [];
        }
        faqData[carrera].push(newFaq);
        saveFaqs(faqData);
        return reply.code(201).send(newFaq);
    }
    catch (error) {
        console.error('Error al crear FAQ:', error);
        return reply.code(500).send({ error: 'Error al crear FAQ' });
    }
});
exports.createFaqHandler = createFaqHandler;
// PUT /api/admin/faqs/:id - Actualizar FAQ
const updateFaqHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const updates = request.body;
        const faqData = loadFaqs();
        for (const carrera of Object.keys(faqData)) {
            const index = faqData[carrera].findIndex(f => f.id === id);
            if (index !== -1) {
                faqData[carrera][index] = Object.assign(Object.assign({}, faqData[carrera][index]), updates);
                saveFaqs(faqData);
                return reply.code(200).send(faqData[carrera][index]);
            }
        }
        return reply.code(404).send({ error: 'FAQ no encontrada' });
    }
    catch (error) {
        console.error('Error al actualizar FAQ:', error);
        return reply.code(500).send({ error: 'Error al actualizar FAQ' });
    }
});
exports.updateFaqHandler = updateFaqHandler;
// DELETE /api/admin/faqs/:id - Eliminar FAQ
const deleteFaqHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const faqData = loadFaqs();
        for (const carrera of Object.keys(faqData)) {
            const index = faqData[carrera].findIndex(f => f.id === id);
            if (index !== -1) {
                faqData[carrera].splice(index, 1);
                saveFaqs(faqData);
                return reply.code(200).send({ message: 'FAQ eliminada correctamente' });
            }
        }
        return reply.code(404).send({ error: 'FAQ no encontrada' });
    }
    catch (error) {
        console.error('Error al eliminar FAQ:', error);
        return reply.code(500).send({ error: 'Error al eliminar FAQ' });
    }
});
exports.deleteFaqHandler = deleteFaqHandler;
// POST /api/admin/faqs/sync - Sincronizar base vectorial
const syncFaqsHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('🔄 Iniciando sincronización de FAQs con la base vectorial...');
        yield (0, vectorService_1.syncVectorStore)();
        return reply.code(200).send({ message: 'Base vectorial sincronizada correctamente' });
    }
    catch (error) {
        console.error('Error al sincronizar FAQs:', error);
        return reply.code(500).send({ error: 'Error al sincronizar la base vectorial' });
    }
});
exports.syncFaqsHandler = syncFaqsHandler;
