-- CreateTable
CREATE TABLE "Noticia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "imagenPath" TEXT,
    "urlExterna" TEXT,
    "categoria" TEXT NOT NULL DEFAULT 'General',
    "destacada" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Noticia_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TikTok" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "tiktokUrl" TEXT NOT NULL,
    "portadaPath" TEXT,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TikTok_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Revista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" TEXT NOT NULL,
    "portadaPath" TEXT NOT NULL,
    "pdfPath" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Revista_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActividadUsuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "accion" TEXT NOT NULL,
    "detalles" TEXT,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ActividadUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'usuario',
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("apellido", "createdAt", "email", "id", "nombre", "password", "rol", "updatedAt", "verificado") SELECT "apellido", "createdAt", "email", "id", "nombre", "password", coalesce("rol", 'usuario') AS "rol", "updatedAt", "verificado" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Noticia_createdBy_idx" ON "Noticia"("createdBy");

-- CreateIndex
CREATE INDEX "Noticia_categoria_idx" ON "Noticia"("categoria");

-- CreateIndex
CREATE INDEX "TikTok_createdBy_idx" ON "TikTok"("createdBy");

-- CreateIndex
CREATE INDEX "Revista_createdBy_idx" ON "Revista"("createdBy");

-- CreateIndex
CREATE INDEX "Revista_anio_idx" ON "Revista"("anio");

-- CreateIndex
CREATE INDEX "ActividadUsuario_usuarioId_idx" ON "ActividadUsuario"("usuarioId");

-- CreateIndex
CREATE INDEX "ActividadUsuario_accion_idx" ON "ActividadUsuario"("accion");
