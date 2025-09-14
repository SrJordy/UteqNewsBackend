
import axios from 'axios';
import https from 'https';
import NodeCache from 'node-cache';
import { getPreferences } from './auth.service';

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
const insecureAgent = new https.Agent({ rejectUnauthorized: false });

let accessToken: string | null = null;

// --- CACHÉ --- (TTL de 10 minutos por defecto)
const cache = new NodeCache({ stdTTL: 600 });

// --- AUTENTICACIÓN ---
export const authenticate = async (): Promise<string> => {
    if (accessToken) return accessToken;
    try {
        const response = await axios.post(`${UTEQ_API_BASE_URL}/api/auth/signin`, AUTH_CREDENTIALS, { httpsAgent: insecureAgent });
        const token = response.data?.accessToken;
        if (token && typeof token === 'string') {
            accessToken = token;
            console.log('Token de UTEQ API obtenido correctamente.');
            return accessToken;
        }
        throw new Error('No se pudo obtener un accessToken válido.');
    } catch (error) {
        console.error('Error al autenticar con la API de UTEQ', error);
        throw new Error('Fallo en la autenticación con el servicio externo.');
    }
};

// --- CLIENTE AXIOS ---
export const uteqApiClient = axios.create({
    baseURL: `${UTEQ_API_BASE_URL}/functions/information/entity`,
    httpsAgent: insecureAgent
});
uteqApiClient.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await authenticate()}`;
    return config;
}, (error) => Promise.reject(error));

// --- TIPOS DE DATOS ---
interface ApiNews { ntCodigo: number; ntUrlNoticia: string; ntUrlPortada: string; ntTitulo: string; ntFecha: string; }
export interface ProcessedNews { id: number; title: string; date: string; newsUrl: string; coverUrl: string; }
interface ApiWeeklySummary { fechapub: string; titulo: string; urlvideo1: string; portadaVideo: string; }
export interface ProcessedWeeklySummary { title: string; videoUrl: string; coverUrl: string; date: string; }
interface ApiMagazine { anio: number; mes: number; urlportada: string; urlpw: string; }
export interface ProcessedMagazine { year: number; month: number; coverUrl: string; pdfUrl: string; }
interface ApiFaculty { dpCodigo: string; dpNombre: string; dpMision: string | null; dpVision: string | null; dpUrlVideo: string; dpCtaFacb: string; dpColor: string; dpParcialUrl: string; }
export interface ProcessedFaculty { id: string; name: string; mission: string | null; vision: string | null; videoUrl: string; facebookUrl: string; color: string; facultyUrl: string; }
interface ApiCareer { crNombre: string; crCampoOcupc: string; crUrlParcial: string; crUrlImgRS: string; }
export interface ProcessedCareer { name: string; description: string; careerUrl: string; imageUrl: string; }
interface ApiTikTok { fechapub: string; titulo: string; urlvideo1: string; portadaVideo: string | null; }
export interface ProcessedTikTok { date: string; title: string; videoUrl: string; coverUrl: string; }

// --- PROCESADORES DE DATOS ---
const processNewsData = (news: ApiNews[]): ProcessedNews[] => news.map(item => ({ id: item.ntCodigo, title: item.ntTitulo, date: item.ntFecha, newsUrl: `${NEWS_URL_PREFIX}${item.ntUrlNoticia}`, coverUrl: `${NEWS_COVER_URL_PREFIX}${item.ntUrlPortada}` }));
const processWeeklySummaryData = (summaries: ApiWeeklySummary[]): ProcessedWeeklySummary[] => summaries.map(item => ({ title: item.titulo, videoUrl: item.urlvideo1, coverUrl: `${WEEKLY_SUMMARY_COVER_URL_PREFIX}${item.portadaVideo}`, date: item.fechapub }));
const processMagazineData = (magazines: ApiMagazine[]): ProcessedMagazine[] => magazines.map(item => ({ year: item.anio, month: item.mes, coverUrl: `${MAGAZINE_COVER_URL_PREFIX}${item.urlportada}`, pdfUrl: item.urlpw }));
const processFacultyData = (faculties: ApiFaculty[]): ProcessedFaculty[] => faculties.map(item => ({ id: item.dpCodigo, name: item.dpNombre, mission: item.dpMision, vision: item.dpVision, videoUrl: item.dpUrlVideo, facebookUrl: item.dpCtaFacb, color: item.dpColor, facultyUrl: `${FACULTY_URL_PREFIX}${item.dpParcialUrl}` }));
const processCareerData = (careers: ApiCareer[]): ProcessedCareer[] => careers.map(item => ({ name: item.crNombre, description: item.crCampoOcupc, careerUrl: `${CAREER_URL_PREFIX}${item.crUrlParcial}`, imageUrl: `${CAREER_IMAGE_URL_PREFIX}${item.crUrlImgRS}` }));
const processTikTokData = (tiktoks: ApiTikTok[]): ProcessedTikTok[] => tiktoks.map(item => ({ date: item.fechapub, title: item.titulo, videoUrl: item.urlvideo1, coverUrl: TIKTOK_COVER_URL }));

// --- SERVICIOS DE OBTENCIÓN DE DATOS (CON CACHÉ) ---
const fetchData = async <T, U>(endpoint: string, processor: (data: T[]) => U[]): Promise<U[]> => {
    const cacheKey = `api_data_${endpoint}`;
    const cachedData = cache.get<U[]>(cacheKey);
    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return cachedData;
    }

    try {
        const response = await uteqApiClient.get<T[]>(endpoint);
        const processedData = processor(response.data);
        cache.set(cacheKey, processedData);
        console.log(`Cache set for ${cacheKey}`);
        return processedData;
    } catch (error) {
        console.error(`Error al obtener datos del endpoint ${endpoint}:`, error);
        throw new Error(`No se pudieron obtener los datos del endpoint ${endpoint}.`);
    }
};

// Exportar todas las funciones de servicio que usan fetchData
export const getLatestNews = () => fetchData<ApiNews, ProcessedNews>('/1', processNewsData);
export const getAllNews = () => fetchData<ApiNews, ProcessedNews>('/2', processNewsData);
export const getLatestWeeklySummaries = () => fetchData<ApiWeeklySummary, ProcessedWeeklySummary>('/3', processWeeklySummaryData);
export const getAllWeeklySummaries = () => fetchData<ApiWeeklySummary, ProcessedWeeklySummary>('/4', processWeeklySummaryData);
export const getLatestMagazines = () => fetchData<ApiMagazine, ProcessedMagazine>('/5', processMagazineData);
export const getAllMagazines = () => fetchData<ApiMagazine, ProcessedMagazine>('/6', processMagazineData);
export const getFaculties = () => fetchData<ApiFaculty, ProcessedFaculty>('/7', processFacultyData);
export const getCareers = () => fetchData<ApiCareer, ProcessedCareer>('/8', processCareerData);
export const getLatestTikToks = () => fetchData<ApiTikTok, ProcessedTikTok>('/10', processTikTokData);
export const getAllTikToks = () => fetchData<ApiTikTok, ProcessedTikTok>('/11', processTikTokData);

export const getCareersByFaculty = async (facultyId: string): Promise<ProcessedCareer[]> => {
    const cacheKey = `careers_by_faculty_${facultyId}`;
    const cachedData = cache.get<ProcessedCareer[]>(cacheKey);
    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return cachedData;
    }

    try {
        const response = await uteqApiClient.get<ApiCareer[]>(`/9/${facultyId}`);
        const processedData = processCareerData(response.data);
        cache.set(cacheKey, processedData);
        console.log(`Cache set for ${cacheKey}`);
        return processedData;
    } catch (error) {
        console.error(`Error al obtener las carreras para la facultad ${facultyId}:`, error);
        throw new Error('No se pudieron obtener las carreras para la facultad especificada.');
    }
};

// --- SERVICIO DE FILTRADO GENERALIZADO ---
type ContentType = 'news' | 'weekly-summaries' | 'tiktoks';

export const getFilteredContent = async (contentType: ContentType, userEmail: string): Promise<any[] | { message: string }> => {
    try {
        const userPreferences = await getPreferences(userEmail); // Obtener preferencias del usuario

        if (!userPreferences || userPreferences.preferences.length === 0) {
            // Si no hay preferencias, devolver los 10 últimos elementos del tipo de contenido
            switch (contentType) {
                case 'news': return (await getLatestNews()).slice(0, 10);
                case 'weekly-summaries': return (await getLatestWeeklySummaries()).slice(0, 10);
                case 'tiktoks': return (await getLatestTikToks()).slice(0, 10);
                default: return [];
            }
        }

        const preferredCareerNames = userPreferences.preferences.map(p => p.toLowerCase());

        let allContent: any[] = [];
        switch (contentType) {
            case 'news': allContent = await getAllNews(); break;
            case 'weekly-summaries': allContent = await getAllWeeklySummaries(); break;
            case 'tiktoks': allContent = await getAllTikToks(); break;
        }

        const filteredContent = allContent.filter((item: any) => {
            const itemTitle = item.title ? item.title.toLowerCase() : '';
            return preferredCareerNames.some(pref => itemTitle.includes(pref));
        });

        // Si no hay coincidencias después de filtrar
        if (filteredContent.length === 0) {
            return { message: "No existen coincidencias con las preferencias del usuario." };
        }

        // Devolver los 10 primeros elementos filtrados
        return filteredContent.slice(0, 10);

    } catch (error) {
        console.error(`Error al obtener contenido filtrado de tipo ${contentType} para ${userEmail}:`, error);
        throw new Error(`No se pudieron obtener los ${contentType} filtrados.`);
    }
};
