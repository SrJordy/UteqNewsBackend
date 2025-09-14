-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carrera" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL
);
INSERT INTO "new_Carrera" ("apiId", "id", "nombre") SELECT "apiId", "id", "nombre" FROM "Carrera";
DROP TABLE "Carrera";
ALTER TABLE "new_Carrera" RENAME TO "Carrera";
CREATE UNIQUE INDEX "Carrera_apiId_key" ON "Carrera"("apiId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
