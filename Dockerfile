FROM node:20-alpine AS backend
# Instalar pnpm
RUN npm install -g pnpm
WORKDIR /app
# Copiar archivos de dependencias primero (para cache de Docker)
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
# Instalar dependencias de producción y generar Prisma
RUN pnpm install --prod --frozen-lockfile && pnpm prisma generate
# Copiar archivos compilados y recursos
COPY dist ./dist
COPY .env ./
COPY uploads ./uploads
COPY data ./data
COPY dev.db ./
# Exponer puerto del backend
EXPOSE 3000
# Iniciar el servidor
ENTRYPOINT ["node", "dist/index.js"]

FROM nginx:latest AS nginx_conf
WORKDIR /home/app
COPY ./nginx.conf /etc/nginx/nginx.conf