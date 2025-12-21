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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🌱 Seeding database...');
        // Crear SuperUser
        const hashedPassword = yield bcryptjs_1.default.hash('HellheimSystemJV', 10);
        const superUser = yield prisma.usuario.upsert({
            where: { email: 'hellheim@admin.com' },
            update: {},
            create: {
                nombre: 'Hellheim',
                apellido: 'Owner',
                email: 'hellheim@admin.com',
                password: hashedPassword,
                rol: 'superadmin',
                verificado: true,
                activo: true,
            },
        });
        console.log('✅ SuperUser creado:');
        console.log(`   Email: hellheim@admin.com`);
        console.log(`   Usuario: HellheimOwner`);
        console.log(`   Rol: superadmin`);
        console.log('🎉 Seed completado!');
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
