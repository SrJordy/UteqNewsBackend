"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_COOKIE_NAME = exports.ACCESS_COOKIE_NAME = exports.getCookieOptions = exports.shouldRefreshToken = exports.verifyToken = exports.generateTokenPair = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Configuración
const JWT_SECRET = process.env.JWT_SECRET || 'presoft_uteq_secret_key_2024_muy_segura';
const ACCESS_TOKEN_TTL = '15m'; // 15 minutos
const REFRESH_TOKEN_TTL = '7d'; // 7 días
/**
 * Genera un access token (15 min)
 */
const generateAccessToken = (userId, email, rol) => {
    return jsonwebtoken_1.default.sign({ userId, email, rol, type: 'access' }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
};
exports.generateAccessToken = generateAccessToken;
/**
 * Genera un refresh token (7 días)
 */
const generateRefreshToken = (userId, email, rol) => {
    return jsonwebtoken_1.default.sign({ userId, email, rol, type: 'refresh' }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_TTL });
};
exports.generateRefreshToken = generateRefreshToken;
/**
 * Genera ambos tokens
 */
const generateTokenPair = (userId, email, rol) => {
    return {
        accessToken: (0, exports.generateAccessToken)(userId, email, rol),
        refreshToken: (0, exports.generateRefreshToken)(userId, email, rol)
    };
};
exports.generateTokenPair = generateTokenPair;
/**
 * Verifica y decodifica un token
 */
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
/**
 * Verifica si un token necesita renovarse (menos de 10 min restantes)
 */
const shouldRefreshToken = (decoded) => {
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = decoded.exp - now;
    const tenMinutesInSeconds = 10 * 60;
    return timeRemaining < tenMinutesInSeconds;
};
exports.shouldRefreshToken = shouldRefreshToken;
/**
 * Configuración de cookies
 */
const getCookieOptions = (isProduction = false) => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/'
});
exports.getCookieOptions = getCookieOptions;
exports.ACCESS_COOKIE_NAME = 'accessToken';
exports.REFRESH_COOKIE_NAME = 'refreshToken';
