import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import path from 'path';
import { syncVectorStore } from '../services/vectorService';

const FAQ_PATH = path.join(__dirname, '../../data/faq_carreras.json');

interface FaqItem {
    id: string;
    carrera: string;
    categoria: string;
    pregunta: string;
    respuesta: string;
}

interface FaqData {
    software: FaqItem[];
    [key: string]: FaqItem[];
}

interface PaginationQuery {
    page?: string;
    limit?: string;
    search?: string;
}

// Helpers
const loadFaqs = (): FaqData => {
    try {
        if (fs.existsSync(FAQ_PATH)) {
            const data = fs.readFileSync(FAQ_PATH, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error cargando FAQs:', error);
    }
    return { software: [] };
};

const saveFaqs = (data: FaqData): void => {
    fs.writeFileSync(FAQ_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

const generateId = (carrera: string): string => {
    const prefix = carrera === 'software' ? 'soft' : carrera.substring(0, 4);
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `${prefix}_${timestamp}_${random}`;
};

// GET /api/admin/faqs - Listar FAQs con paginación y búsqueda
export const getFaqsHandler = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
) => {
    try {
        const page = parseInt(request.query.page || '1');
        const limit = parseInt(request.query.limit || '20');
        const search = (request.query.search || '').toLowerCase().trim();
        const skip = (page - 1) * limit;

        const faqData = loadFaqs();
        let allFaqs: FaqItem[] = [];

        // Recopilar FAQs de todas las carreras
        for (const carrera of Object.keys(faqData)) {
            allFaqs = [...allFaqs, ...faqData[carrera]];
        }

        // Filtrar por búsqueda
        if (search) {
            allFaqs = allFaqs.filter(faq =>
                faq.pregunta.toLowerCase().includes(search) ||
                faq.respuesta.toLowerCase().includes(search) ||
                faq.categoria.toLowerCase().includes(search)
            );
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
    } catch (error) {
        console.error('Error al obtener FAQs:', error);
        return reply.code(500).send({ error: 'Error al obtener FAQs' });
    }
};

// GET /api/admin/faqs/:id - Obtener FAQ por ID
export const getFaqByIdHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
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
    } catch (error) {
        console.error('Error al obtener FAQ:', error);
        return reply.code(500).send({ error: 'Error al obtener FAQ' });
    }
};

// POST /api/admin/faqs - Crear nueva FAQ
export const createFaqHandler = async (
    request: FastifyRequest<{ Body: Omit<FaqItem, 'id'> }>,
    reply: FastifyReply
) => {
    try {
        const { carrera, categoria, pregunta, respuesta } = request.body;

        if (!carrera || !categoria || !pregunta || !respuesta) {
            return reply.code(400).send({ error: 'Todos los campos son requeridos' });
        }

        const faqData = loadFaqs();
        const newFaq: FaqItem = {
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
    } catch (error) {
        console.error('Error al crear FAQ:', error);
        return reply.code(500).send({ error: 'Error al crear FAQ' });
    }
};

// PUT /api/admin/faqs/:id - Actualizar FAQ
export const updateFaqHandler = async (
    request: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<FaqItem, 'id'>> }>,
    reply: FastifyReply
) => {
    try {
        const { id } = request.params;
        const updates = request.body;
        const faqData = loadFaqs();

        for (const carrera of Object.keys(faqData)) {
            const index = faqData[carrera].findIndex(f => f.id === id);
            if (index !== -1) {
                faqData[carrera][index] = {
                    ...faqData[carrera][index],
                    ...updates
                };
                saveFaqs(faqData);
                return reply.code(200).send(faqData[carrera][index]);
            }
        }

        return reply.code(404).send({ error: 'FAQ no encontrada' });
    } catch (error) {
        console.error('Error al actualizar FAQ:', error);
        return reply.code(500).send({ error: 'Error al actualizar FAQ' });
    }
};

// DELETE /api/admin/faqs/:id - Eliminar FAQ
export const deleteFaqHandler = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
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
    } catch (error) {
        console.error('Error al eliminar FAQ:', error);
        return reply.code(500).send({ error: 'Error al eliminar FAQ' });
    }
};

// POST /api/admin/faqs/sync - Sincronizar base vectorial
export const syncFaqsHandler = async (
    _request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        console.log('🔄 Iniciando sincronización de FAQs con la base vectorial...');
        await syncVectorStore();
        return reply.code(200).send({ message: 'Base vectorial sincronizada correctamente' });
    } catch (error) {
        console.error('Error al sincronizar FAQs:', error);
        return reply.code(500).send({ error: 'Error al sincronizar la base vectorial' });
    }
};
