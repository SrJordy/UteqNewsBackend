import { PrismaClient } from '@prisma/client';

// Evita que se creen múltiples instancias de PrismaClient en el entorno de desarrollo
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}