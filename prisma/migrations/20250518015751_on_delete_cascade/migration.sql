-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Baby" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "brand" TEXT NOT NULL,
    "notes" TEXT,
    "gender" TEXT NOT NULL DEFAULT 'OTHER',
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Baby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Baby" ("birthDate", "brand", "createdAt", "gender", "height", "id", "name", "notes", "updatedAt", "userId", "weight") SELECT "birthDate", "brand", "createdAt", "gender", "height", "id", "name", "notes", "updatedAt", "userId", "weight" FROM "Baby";
DROP TABLE "Baby";
ALTER TABLE "new_Baby" RENAME TO "Baby";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
