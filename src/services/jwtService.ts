import jwt from 'jsonwebtoken';

// Configuración
const JWT_SECRET = process.env.JWT_SECRET || 'presoft_uteq_secret_key_2024_muy_segura';
const ACCESS_TOKEN_TTL = '15m';  // 15 minutos
const REFRESH_TOKEN_TTL = '7d';  // 7 días

interface TokenPayload {
    userId: number;
    email: string;
    rol: string;
    type: 'access' | 'refresh';
}

interface DecodedToken extends TokenPayload {
    iat: number;
    exp: number;
}

/**
 * Genera un access token (15 min)
 */
export const generateAccessToken = (userId: number, email: string, rol: string): string => {
    return jwt.sign(
        { userId, email, rol, type: 'access' } as TokenPayload,
        JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_TTL }
    );
};

/**
 * Genera un refresh token (7 días)
 */
export const generateRefreshToken = (userId: number, email: string, rol: string): string => {
    return jwt.sign(
        { userId, email, rol, type: 'refresh' } as TokenPayload,
        JWT_SECRET,
        { expiresIn: REFRESH_TOKEN_TTL }
    );
};

/**
 * Genera ambos tokens
 */
export const generateTokenPair = (userId: number, email: string, rol: string) => {
    return {
        accessToken: generateAccessToken(userId, email, rol),
        refreshToken: generateRefreshToken(userId, email, rol)
    };
};

/**
 * Verifica y decodifica un token
 */
export const verifyToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as DecodedToken;
    } catch (error) {
        return null;
    }
};

/**
 * Verifica si un token necesita renovarse (menos de 10 min restantes)
 */
export const shouldRefreshToken = (decoded: DecodedToken): boolean => {
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = decoded.exp - now;
    const tenMinutesInSeconds = 10 * 60;
    return timeRemaining < tenMinutesInSeconds;
};

/**
 * Configuración de cookies
 * Para cross-origin (frontend en diferente puerto/dominio) se requiere:
 * - sameSite: 'none' 
 * - secure: true (OBLIGATORIO con sameSite='none')
 */
export const getCookieOptions = (isProduction: boolean = false) => ({
    httpOnly: true,
    secure: true, // SIEMPRE true para HTTPS
    sameSite: 'none' as const, // Necesario para cross-origin
    path: '/'
});

export const ACCESS_COOKIE_NAME = 'accessToken';
export const REFRESH_COOKIE_NAME = 'refreshToken';
