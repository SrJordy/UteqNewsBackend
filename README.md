# 🚀 UTEQ News Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-4.0+-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

**API REST robusta para el ecosistema UTEQ News**

[Características](#-características) • [Instalación](#-instalación) • [API Endpoints](#-api-endpoints) • [Arquitectura](#-arquitectura)

</div>

---

## 📋 Descripción

Backend desarrollado con **Fastify** y **TypeScript** que proporciona servicios REST para:

- 📱 Aplicación móvil UTEQ News (Flutter)
- 💻 Panel de administración web (React)
- 🤖 Chatbot con IA integrada

## ✨ Características

### 🔐 Autenticación & Seguridad

- **JWT con Cookies HttpOnly** para el panel admin
- **Refresh Tokens** automáticos (15 días de validez)
- **Auto-renovación** de tokens (cuando quedan < 10 min)
- Rutas móviles sin restricción para la app Flutter
- Protección de superadmin (no eliminable/desactivable)

### 📰 Gestión de Contenido

- **Noticias**: CRUD completo con imágenes de portada y evidencias
- **TikToks**: Gestión de contenido multimedia con portadas
- **Revistas**: Upload de PDFs y portadas
- **FAQs del Chatbot**: Gestión con sincronización vectorial

### 🤖 Inteligencia Artificial

- Integración con **OpenRouter API** (Gemini Pro)
- Base de datos vectorial con **sql.js**
- Embeddings con **text-embedding-3-small**
- Búsqueda semántica para respuestas contextuales

### 📧 Sistema de Notificaciones

- Envío de correos con **Nodemailer**
- Templates HTML para credenciales de admin
- Códigos de verificación para usuarios

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18+
- pnpm (recomendado) o npm

### Pasos

```bash
# Clonar el repositorio
git clone <repository-url>
cd UteqNewsBackend

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Generar cliente Prisma
pnpm prisma generate

# Ejecutar migraciones (si aplica)
pnpm prisma migrate dev

# Iniciar en desarrollo
pnpm start
```

### Variables de Entorno

```env
# Base de datos
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="tu-secreto-super-seguro-aqui"

# OpenRouter (IA)
OPENROUTER_API_KEY="sk-or-xxxxx"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tu-email@gmail.com"
SMTP_PASS="tu-app-password"

# API UTEQ Externa
UTEQ_API_BASE_URL="https://api.uteq.edu.ec"
UTEQ_API_USER="usuario"
UTEQ_API_PASS="password"
```

## 📚 API Endpoints

### 🔐 Autenticación Admin

| Método | Endpoint                 | Descripción            |
| ------ | ------------------------ | ---------------------- |
| `POST` | `/api/auth/admin/login`  | Login con cookies JWT  |
| `POST` | `/api/auth/admin/logout` | Cerrar sesión          |
| `GET`  | `/api/auth/admin/me`     | Obtener usuario actual |

### 📰 Noticias (Protegido)

| Método   | Endpoint                             | Descripción           |
| -------- | ------------------------------------ | --------------------- |
| `GET`    | `/api/admin/noticias`                | Listar con paginación |
| `POST`   | `/api/admin/noticias`                | Crear noticia         |
| `PUT`    | `/api/admin/noticias/:id`            | Actualizar noticia    |
| `DELETE` | `/api/admin/noticias/:id`            | Eliminar noticia      |
| `POST`   | `/api/admin/noticias/:id/imagen`     | Subir portada         |
| `POST`   | `/api/admin/noticias/:id/evidencias` | Subir evidencias      |

### 👤 Usuarios (Protegido)

| Método   | Endpoint                                   | Descripción           |
| -------- | ------------------------------------------ | --------------------- |
| `GET`    | `/api/admin/usuarios`                      | Listar usuarios       |
| `PUT`    | `/api/admin/usuarios/:id/estado`           | Activar/Desactivar    |
| `DELETE` | `/api/admin/usuarios/:id`                  | Eliminar usuario      |
| `PUT`    | `/api/admin/usuarios/:id/cambiar-password` | Cambiar contraseña    |
| `POST`   | `/api/admin/usuarios/register-admin`       | Registrar nuevo admin |

### 🤖 Chatbot IA

| Método | Endpoint               | Descripción                |
| ------ | ---------------------- | -------------------------- |
| `POST` | `/api/ai/chat`         | Enviar mensaje al chatbot  |
| `GET`  | `/api/admin/faqs`      | Listar FAQs                |
| `POST` | `/api/admin/faqs/sync` | Sincronizar base vectorial |

## 🏗️ Arquitectura

```
src/
├── controllers/         # Handlers de rutas
│   ├── adminController.ts
│   ├── authController.ts
│   └── aiController.ts
├── middleware/
│   └── authMiddleware.ts   # JWT validation + auto-refresh
├── routes/
│   ├── adminRoutes.ts      # Rutas protegidas
│   ├── authRoutes.ts
│   └── aiRoutes.ts
├── services/
│   ├── authService.ts
│   ├── jwtService.ts       # Token generation
│   └── vectorService.ts    # AI embeddings
├── lib/
│   └── mailer.ts           # Email service
└── index.ts                # Entry point
```

## 🔒 Seguridad

- ✅ Tokens JWT en cookies HttpOnly (no accesibles via JS)
- ✅ Validación de roles (admin/superadmin)
- ✅ Auto-refresh de tokens transparente
- ✅ Protección contra auto-eliminación/desactivación
- ✅ Superadmin inmutable
- ✅ CORS configurado para credenciales

## 📦 Scripts

```bash
pnpm start      # Desarrollo con ts-node
pnpm build      # Compilar TypeScript
pnpm prisma:gen # Regenerar cliente Prisma
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:3000/

# Login admin
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@uteq.edu.ec","password":"123456"}'
```

---

<div align="center">

**Desarrollado por Jordy Vilcacundo C.**

Universidad Técnica Estatal de Quevedo - 2024

</div>
