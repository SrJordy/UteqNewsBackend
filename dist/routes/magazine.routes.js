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
const magazine_controller_1 = require("../controllers/magazine.controller");
/**
 * Registra las rutas de las revistas en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const magazineRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    server.get('/latest', magazine_controller_1.handleGetLatestMagazines);
    server.get('/all', magazine_controller_1.handleGetAllMagazines);
});
exports.default = magazineRoutes;
