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
const facultyController_1 = require("../controllers/facultyController");
/**
 * Registra las rutas de las facultades en el servidor Fastify.
 * @param server - La instancia de Fastify.
 */
const facultyRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    server.get('/all', facultyController_1.handleGetFaculties);
});
exports.default = facultyRoutes;
