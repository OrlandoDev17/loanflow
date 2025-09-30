/*
  Warnings:

  - You are about to alter the column `cedula` on the `Cliente` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Made the column `cedula` on table `Cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" INTEGER NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Cliente" ("apellido", "cedula", "correo", "creadoEn", "direccion", "id", "nombre", "telefono") SELECT "apellido", "cedula", "correo", "creadoEn", "direccion", "id", "nombre", "telefono" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_cedula_key" ON "Cliente"("cedula");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
