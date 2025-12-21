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
const mobileController_1 = require("../controllers/mobileController");
/**
 * Rutas públicas para la aplicación móvil
 * NO requieren autenticación
 */
const mobileRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    // === NOTICIAS ===
    server.get('/noticias/latest', mobileController_1.getLatestNoticiasHandler);
    server.get('/noticias/all', mobileController_1.getAllNoticiasHandler);
    server.get('/noticias/:id', mobileController_1.getNoticiaByIdHandler);
    // === TIKTOKS ===
    server.get('/tiktoks/latest', mobileController_1.getLatestTikToksHandler);
    server.get('/tiktoks/all', mobileController_1.getAllTikToksHandler);
    // === REVISTAS ===
    server.get('/revistas/latest', mobileController_1.getLatestRevistasHandler);
    server.get('/revistas/all', mobileController_1.getAllRevistasHandler);
});
exports.default = mobileRoutes;
