/*
  Warnings:

  - Added the required column `frecuenciaPago` to the `Prestamo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prestamo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monto" REAL NOT NULL,
    "cuotas" INTEGER NOT NULL,
    "interes" REAL NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "frecuenciaPago" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Prestamo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prestamo" ("clienteId", "cuotas", "fechaInicio", "id", "interes", "monto") SELECT "clienteId", "cuotas", "fechaInicio", "id", "interes", "monto" FROM "Prestamo";
DROP TABLE "Prestamo";
ALTER TABLE "new_Prestamo" RENAME TO "Prestamo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
