import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Crear SuperUser
    const hashedPassword = await bcrypt.hash('HellheimSystemJV', 10);

    const superUser = await prisma.usuario.upsert({
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
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
