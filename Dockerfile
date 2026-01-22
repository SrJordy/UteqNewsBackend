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
RUN pnpm prisma generate && pnpm run build
# Copiar recursos
COPY uploads ./uploads
COPY data ./data
COPY .env ./
COPY start.sh ./
RUN chmod +x start.sh

# Exponer puerto del backend
EXPOSE 3000
# Iniciar con el script de arranque
ENTRYPOINT ["./start.sh"]

FROM nginx:latest AS nginx_conf
WORKDIR /home/app
COPY ./nginx.conf /etc/nginx/nginx.conf