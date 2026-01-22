#!/bin/sh
set -e

echo "🚀 Iniciando contenedor..."

# Ejecutar migraciones
echo "📦 Ejecutando migraciones de base de datos..."
node dist/index.js --migrate-only || pnpm prisma migrate deploy

# Ejecutar seed
echo "🌱 Ejecutando seed..."
pnpm prisma db seed

# Iniciar la aplicación
echo "🔥 Iniciando servidor..."
exec node dist/index.js
