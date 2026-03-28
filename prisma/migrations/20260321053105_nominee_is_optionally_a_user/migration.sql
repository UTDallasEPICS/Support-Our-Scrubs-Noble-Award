-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nominee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "placeOfWork" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "aboutme" TEXT,
    "photoURL" TEXT,
    "slug" TEXT NOT NULL,
    "userId" TEXT,
    "nominatorId" TEXT NOT NULL,
    "adminId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Nominee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Nominee_nominatorId_fkey" FOREIGN KEY ("nominatorId") REFERENCES "Nominator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nominee_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Nominee" ("aboutme", "address", "adminId", "deleted", "description", "id", "nominatorId", "occupation", "phoneNumber", "photoURL", "placeOfWork", "slug", "status", "userId") SELECT "aboutme", "address", "adminId", "deleted", "description", "id", "nominatorId", "occupation", "phoneNumber", "photoURL", "placeOfWork", "slug", "status", "userId" FROM "Nominee";
DROP TABLE "Nominee";
ALTER TABLE "new_Nominee" RENAME TO "Nominee";
CREATE UNIQUE INDEX "Nominee_slug_key" ON "Nominee"("slug");
CREATE UNIQUE INDEX "Nominee_userId_key" ON "Nominee"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
