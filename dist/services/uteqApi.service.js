"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredContent = exports.getCareersByFaculty = exports.getAllTikToks = exports.getLatestTikToks = exports.getCareers = exports.getFaculties = exports.getAllMagazines = exports.getLatestMagazines = exports.getAllWeeklySummaries = exports.getLatestWeeklySummaries = exports.getAllNews = exports.getLatestNews = exports.uteqApiClient = exports.authenticate = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const node_cache_1 = __importDefault(require("node-cache"));
const auth_service_1 = require("./auth.service");
// --- Configuración de la API de UTEQ ---
const UTEQ_API_BASE_URL = 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew';
const AUTH_CREDENTIALS = { username: "_x1userdev", password: "LineGold179#5ft2" };
// --- Prefijos para las URLs parciales ---
const NEWS_URL_PREFIX = 'https://uteq.edu.ec/es/comunicacion/noticia/';
const NEWS_COVER_URL_PREFIX = 'https://uteq.edu.ec/assets/images/news/pagina/';
const WEEKLY_SUMMARY_COVER_URL_PREFIX = 'https://uteq.edu.ec/assets/images/videos/res-sem/';
const MAGAZINE_COVER_URL_PREFIX = 'https://uteq.edu.ec/assets/images/newspapers/';
const FACULTY_URL_PREFIX = 'https://uteq.edu.ec/es/grado/facultad/';
const CAREER_URL_PREFIX = 'https://uteq.edu.ec/es/grado/carrera/';
const CAREER_IMAGE_URL_PREFIX = 'https://uteq.edu.ec/assets/images/front-pages/';
const TIKTOK_COVER_URL = 'https://www.uteq.edu.ec/assets/img/portada-tiktok-video.jpg';
// AGENTE PARA IGNORAR ERRORES DE CERTIFICADO SSL (SOLO PARA DESARROLLO)
const insecureAgent = new https_1.default.Agent({ rejectUnauthorized: false });
let accessToken = null;
// --- CACHÉ --- (TTL de 10 minutos por defecto)
const cache = new node_cache_1.default({ stdTTL: 600 });
// --- AUTENTICACIÓN ---
const authenticate = async () => {
    if (accessToken)
        return accessToken;
    try {
        const response = await axios_1.default.post(`${UTEQ_API_BASE_URL}/api/auth/signin`, AUTH_CREDENTIALS, { httpsAgent: insecureAgent });
        const token = response.data?.accessToken;
        if (token && typeof token === 'string') {
            accessToken = token;
            console.log('Token de UTEQ API obtenido correctamente.');
            return accessToken;
        }
        throw new Error('No se pudo obtener un accessToken válido.');
    }
    catch (error) {
        console.error('Error al autenticar con la API de UTEQ', error);
        throw new Error('Fallo en la autenticación con el servicio externo.');
    }
};
exports.authenticate = authenticate;
// --- CLIENTE AXIOS ---
exports.uteqApiClient = axios_1.default.create({
    baseURL: `${UTEQ_API_BASE_URL}/functions/information/entity`,
    httpsAgent: insecureAgent
});
exports.uteqApiClient.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await (0, exports.authenticate)()}`;
    return config;
}, (error) => Promise.reject(error));
// --- PROCESADORES DE DATOS ---
const processNewsData = (news) => news.map(item => ({ id: item.ntCodigo, title: item.ntTitulo, date: item.ntFecha, newsUrl: `${NEWS_URL_PREFIX}${item.ntUrlNoticia}`, coverUrl: `${NEWS_COVER_URL_PREFIX}${item.ntUrlPortada}` }));
const processWeeklySummaryData = (summaries) => summaries.map(item => ({ title: item.titulo, videoUrl: item.urlvideo1, coverUrl: `${WEEKLY_SUMMARY_COVER_URL_PREFIX}${item.portadaVideo}`, date: item.fechapub }));
const processMagazineData = (magazines) => magazines.map(item => ({ year: item.anio, month: item.mes, coverUrl: `${MAGAZINE_COVER_URL_PREFIX}${item.urlportada}`, pdfUrl: item.urlpw }));
const processFacultyData = (faculties) => faculties.map(item => ({ id: item.dpCodigo, name: item.dpNombre, mission: item.dpMision, vision: item.dpVision, videoUrl: item.dpUrlVideo, facebookUrl: item.dpCtaFacb, color: item.dpColor, facultyUrl: `${FACULTY_URL_PREFIX}${item.dpParcialUrl}` }));
const processCareerData = (careers) => careers.map(item => ({ name: item.crNombre, description: item.crCampoOcupc, careerUrl: `${CAREER_URL_PREFIX}${item.crUrlParcial}`, imageUrl: `${CAREER_IMAGE_URL_PREFIX}${item.crUrlImgRS}` }));
const processTikTokData = (tiktoks) => tiktoks.map(item => ({ date: item.fechapub, title: item.titulo, videoUrl: item.urlvideo1, coverUrl: TIKTOK_COVER_URL }));
// --- SERVICIOS DE OBTENCIÓN DE DATOS (CON CACHÉ) ---
const fetchData = async (endpoint, processor) => {
    const cacheKey = `api_data_${endpoint}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return cachedData;
    }
    try {
        const response = await exports.uteqApiClient.get(endpoint);
        const processedData = processor(response.data);
        cache.set(cacheKey, processedData);
        console.log(`Cache set for ${cacheKey}`);
        return processedData;
    }
    catch (error) {
        console.error(`Error al obtener datos del endpoint ${endpoint}:`, error);
        throw new Error(`No se pudieron obtener los datos del endpoint ${endpoint}.`);
    }
};
// Exportar todas las funciones de servicio que usan fetchData
const getLatestNews = () => fetchData('/1', processNewsData);
exports.getLatestNews = getLatestNews;
const getAllNews = () => fetchData('/2', processNewsData);
exports.getAllNews = getAllNews;
const getLatestWeeklySummaries = () => fetchData('/3', processWeeklySummaryData);
exports.getLatestWeeklySummaries = getLatestWeeklySummaries;
const getAllWeeklySummaries = () => fetchData('/4', processWeeklySummaryData);
exports.getAllWeeklySummaries = getAllWeeklySummaries;
const getLatestMagazines = () => fetchData('/5', processMagazineData);
exports.getLatestMagazines = getLatestMagazines;
const getAllMagazines = () => fetchData('/6', processMagazineData);
exports.getAllMagazines = getAllMagazines;
const getFaculties = () => fetchData('/7', processFacultyData);
exports.getFaculties = getFaculties;
const getCareers = () => fetchData('/8', processCareerData);
exports.getCareers = getCareers;
const getLatestTikToks = () => fetchData('/10', processTikTokData);
exports.getLatestTikToks = getLatestTikToks;
const getAllTikToks = () => fetchData('/11', processTikTokData);
exports.getAllTikToks = getAllTikToks;
const getCareersByFaculty = async (facultyId) => {
    const cacheKey = `careers_by_faculty_${facultyId}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return cachedData;
    }
    try {
        const response = await exports.uteqApiClient.get(`/9/${facultyId}`);
        const processedData = processCareerData(response.data);
        cache.set(cacheKey, processedData);
        console.log(`Cache set for ${cacheKey}`);
        return processedData;
    }
    catch (error) {
        console.error(`Error al obtener las carreras para la facultad ${facultyId}:`, error);
        throw new Error('No se pudieron obtener las carreras para la facultad especificada.');
    }
};
exports.getCareersByFaculty = getCareersByFaculty;
const getFilteredContent = async (contentType, userEmail) => {
    try {
        const userPreferences = await (0, auth_service_1.getPreferences)(userEmail); // Obtener preferencias del usuario
        if (!userPreferences || userPreferences.preferences.length === 0) {
            // Si no hay preferencias, devolver los 10 últimos elementos del tipo de contenido
            switch (contentType) {
                case 'news': return (await (0, exports.getLatestNews)()).slice(0, 10);
                case 'weekly-summaries': return (await (0, exports.getLatestWeeklySummaries)()).slice(0, 10);
                case 'tiktoks': return (await (0, exports.getLatestTikToks)()).slice(0, 10);
                default: return [];
            }
        }
        const preferredCareerNames = userPreferences.preferences.map(p => p.toLowerCase());
        let allContent = [];
        switch (contentType) {
            case 'news':
                allContent = await (0, exports.getAllNews)();
                break;
            case 'weekly-summaries':
                allContent = await (0, exports.getAllWeeklySummaries)();
                break;
            case 'tiktoks':
                allContent = await (0, exports.getAllTikToks)();
                break;
        }
        const filteredContent = allContent.filter((item) => {
            const itemTitle = item.title ? item.title.toLowerCase() : '';
            return preferredCareerNames.some(pref => itemTitle.includes(pref));
        });
        // Si no hay coincidencias después de filtrar
        if (filteredContent.length === 0) {
            return { message: "No existen coincidencias con las preferencias del usuario." };
        }
        // Devolver los 10 primeros elementos filtrados
        return filteredContent.slice(0, 10);
    }
    catch (error) {
        console.error(`Error al obtener contenido filtrado de tipo ${contentType} para ${userEmail}:`, error);
        throw new Error(`No se pudieron obtener los ${contentType} filtrados.`);
    }
};
exports.getFilteredContent = getFilteredContent;
