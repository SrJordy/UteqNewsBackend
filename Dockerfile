FROM node:20-alpine AS backend
# Instalar pnpm
RUN npm install -g pnpm
WORKDIR /app

# Copiar archivos de dependencias primero (para cache de Docker)
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Instalar TODAS las dependencias (incluye devDependencies para el build)
RUN pnpm install --frozen-lockfile

# Generar Prisma y compilar TypeScript
RUN npx prisma generate && pnpm run build

# Copiar recursos y .env (necesario para la conexión a BD en las migraciones)
COPY uploads ./uploads
COPY data ./data
COPY .env ./

# Ejecutar migraciones y seed durante el build (cargando .env manualmente)
RUN export $(cat .env | grep -v '^#' | xargs) && npx prisma migrate deploy
RUN export $(cat .env | grep -v '^#' | xargs) && npx prisma db seed

# Exponer puerto del backend
EXPOSE 3000

# Iniciar el servidor directamente
ENTRYPOINT ["node", "dist/index.js"]

FROM nginx:latest AS nginx_conf
WORKDIR /home/app
COPY ./nginx.conf /etc/nginx/nginx.conf