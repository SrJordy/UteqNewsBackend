#!/bin/sh
set -e

echo "🚀 Iniciando contenedor..."

# Generar cliente Prisma (IMPORTANTE: para asegurar compatibilidad)
echo "🔄 Generando cliente Prisma..."
npx prisma generate

# Ejecutar migraciones
echo "📦 Ejecutando migraciones de base de datos..."
# Intenta migrar, si falla no detiene el contenedor inmediatamente pero muestra error
npx prisma migrate deploy || echo "⚠️ Fallo en migraciones, intentando continuar..."

# Ejecutar seed
echo "🌱 Ejecutando seed..."
npx prisma db seed || echo "⚠️ Fallo en seed, intentando continuar..."

# Iniciar la aplicación
echo "🔥 Iniciando servidor..."
exec node dist/index.js
