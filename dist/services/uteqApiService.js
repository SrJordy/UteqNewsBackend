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
exports.getFilteredContent = exports.getCareersByFaculty = exports.getAllTikToks = exports.getLatestTikToks = exports.getCareers = exports.getFaculties = exports.getAllMagazines = exports.getLatestMagazines = exports.getAllWeeklySummaries = exports.getLatestWeeklySummaries = exports.getAllNews = exports.getLatestNews = exports.uteqApiClient = exports.authenticate = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const node_cache_1 = __importDefault(require("node-cache"));
const authService_1 = require("./authService");
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
const authenticate = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (accessToken)
        return accessToken;
    try {
        const response = yield axios_1.default.post(`${UTEQ_API_BASE_URL}/api/auth/signin`, AUTH_CREDENTIALS, { httpsAgent: insecureAgent });
        const token = (_a = response.data) === null || _a === void 0 ? void 0 : _a.accessToken;
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
});
exports.authenticate = authenticate;
// --- CLIENTE AXIOS ---
exports.uteqApiClient = axios_1.default.create({
    baseURL: `${UTEQ_API_BASE_URL}/functions/information/entity`,
    httpsAgent: insecureAgent
});
exports.uteqApiClient.interceptors.request.use((config) => __awaiter(void 0, void 0, void 0, function* () {
    config.headers.Authorization = `Bearer ${yield (0, exports.authenticate)()}`;
    return config;
}), (error) => Promise.reject(error));
// --- PROCESADORES DE DATOS ---
const processNewsData = (news) => news.map(item => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return ({
        id: (_a = item.ntTitular) !== null && _a !== void 0 ? _a : '',
        title: (_b = item.ntTitular) !== null && _b !== void 0 ? _b : '',
        date: (_c = item.ntFecha) !== null && _c !== void 0 ? _c : '',
        newsUrl: `${NEWS_URL_PREFIX}${(_d = item.ntUrlNoticia) !== null && _d !== void 0 ? _d : ''}`,
        coverUrl: `${NEWS_COVER_URL_PREFIX}${(_e = item.ntUrlPortada) !== null && _e !== void 0 ? _e : ''}`,
        departmentName: (_g = (_f = item.objDepartamento) === null || _f === void 0 ? void 0 : _f.dpNombre) !== null && _g !== void 0 ? _g : undefined,
        categoryName: (_j = (_h = item.objCategoriaNotc) === null || _h === void 0 ? void 0 : _h.gtTitular) !== null && _j !== void 0 ? _j : undefined,
        categoryColor: (_l = (_k = item.objCategoriaNotc) === null || _k === void 0 ? void 0 : _k.gtColorIdentf) !== null && _l !== void 0 ? _l : undefined,
    });
});
const processWeeklySummaryData = (summaries) => summaries.map(item => { var _a, _b, _c, _d; return ({ title: (_a = item.titulo) !== null && _a !== void 0 ? _a : '', videoUrl: (_b = item.urlvideo1) !== null && _b !== void 0 ? _b : '', coverUrl: `${WEEKLY_SUMMARY_COVER_URL_PREFIX}${(_c = item.portadaVideo) !== null && _c !== void 0 ? _c : ''}`, date: (_d = item.fechapub) !== null && _d !== void 0 ? _d : '' }); });
const processMagazineData = (magazines) => magazines.map(item => { var _a, _b, _c, _d; return ({ year: (_a = item.anio) !== null && _a !== void 0 ? _a : 0, month: (_b = item.mes) !== null && _b !== void 0 ? _b : 0, coverUrl: `${MAGAZINE_COVER_URL_PREFIX}${(_c = item.urlportada) !== null && _c !== void 0 ? _c : ''}`, pdfUrl: (_d = item.urlpw) !== null && _d !== void 0 ? _d : '' }); });
const processFacultyData = (faculties) => faculties.map(item => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return ({
        id: (_a = item.dpCodigo) !== null && _a !== void 0 ? _a : '',
        name: (_b = item.dpNombre) !== null && _b !== void 0 ? _b : '',
        mission: (_c = item.dpMision) !== null && _c !== void 0 ? _c : null,
        vision: (_d = item.dpVision) !== null && _d !== void 0 ? _d : null,
        videoUrl: (_e = item.dpUrlVideo) !== null && _e !== void 0 ? _e : '',
        facebookUrl: (_f = item.dpCtaFacb) !== null && _f !== void 0 ? _f : '',
        color: (_g = item.dpColor) !== null && _g !== void 0 ? _g : '#4CAF50',
        facultyUrl: `${FACULTY_URL_PREFIX}${(_h = item.dpParcialUrl) !== null && _h !== void 0 ? _h : ''}`
    });
});
const processCareerData = (careers) => careers.map(item => { var _a, _b, _c, _d; return ({ name: (_a = item.crNombre) !== null && _a !== void 0 ? _a : '', description: (_b = item.crCampoOcupc) !== null && _b !== void 0 ? _b : '', careerUrl: `${CAREER_URL_PREFIX}${(_c = item.crUrlParcial) !== null && _c !== void 0 ? _c : ''}`, imageUrl: `${CAREER_IMAGE_URL_PREFIX}${(_d = item.crUrlImgRS) !== null && _d !== void 0 ? _d : ''}` }); });
const processTikTokData = (tiktoks) => tiktoks.map(item => { var _a, _b, _c; return ({ date: (_a = item.fechapub) !== null && _a !== void 0 ? _a : '', title: (_b = item.titulo) !== null && _b !== void 0 ? _b : '', videoUrl: (_c = item.urlvideo1) !== null && _c !== void 0 ? _c : '', coverUrl: TIKTOK_COVER_URL }); });
// --- SERVICIOS DE OBTENCIÓN DE DATOS (CON CACHÉ) ---
const fetchData = (endpoint, processor) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `api_data_${endpoint}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return cachedData;
    }
    try {
        const response = yield exports.uteqApiClient.get(endpoint);
        const processedData = processor(response.data);
        cache.set(cacheKey, processedData);
        console.log(`Cache set for ${cacheKey}`);
        return processedData;
    }
    catch (error) {
        console.error(`Error al obtener datos del endpoint ${endpoint}:`, error);
        throw new Error(`No se pudieron obtener los datos del endpoint ${endpoint}.`);
    }
});
// Exportar todas las funciones de servicio que usan fetchData (DECLARADAS ANTES DE USARSE)
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
const getCareersByFaculty = (facultyId) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `careers_by_faculty_${facultyId}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return cachedData;
    }
    try {
        const response = yield exports.uteqApiClient.get(`/9/${facultyId}`);
        const processedData = processCareerData(response.data);
        cache.set(cacheKey, processedData);
        console.log(`Cache set for ${cacheKey}`);
        return processedData;
    }
    catch (error) {
        console.error(`Error al obtener las carreras para la facultad ${facultyId}:`, error);
        throw new Error('No se pudieron obtener las carreras para la facultad especificada.');
    }
});
exports.getCareersByFaculty = getCareersByFaculty;
const getFilteredContent = (contentType, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPreferences = yield (0, authService_1.getPreferences)(userEmail); // Obtener preferencias del usuario
        if (!userPreferences || userPreferences.preferences.length === 0) {
            // Si no hay preferencias, devolver los 10 últimos elementos del tipo de contenido
            switch (contentType) {
                case 'news': return (yield (0, exports.getLatestNews)()).slice(0, 10);
                case 'weekly-summaries': return (yield (0, exports.getLatestWeeklySummaries)()).slice(0, 10);
                case 'tiktoks': return (yield (0, exports.getLatestTikToks)()).slice(0, 10);
                default: return [];
            }
        }
        const preferredCareerNames = userPreferences.preferences.map(p => p.toLowerCase());
        let allContent = [];
        switch (contentType) {
            case 'news':
                allContent = yield (0, exports.getAllNews)();
                break;
            case 'weekly-summaries':
                allContent = yield (0, exports.getAllWeeklySummaries)();
                break;
            case 'tiktoks':
                allContent = yield (0, exports.getAllTikToks)();
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
});
exports.getFilteredContent = getFilteredContent;
