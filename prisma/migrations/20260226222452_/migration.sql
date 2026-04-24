/*
  Warnings:

  - You are about to drop the column `email` on the `Nominator` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Nominator` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Nominator` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Nominee` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Nominee` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Nominee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nominator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Nominator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Nominator" ("id", "userId") SELECT "id", "userId" FROM "Nominator";
DROP TABLE "Nominator";
ALTER TABLE "new_Nominator" RENAME TO "Nominator";
CREATE UNIQUE INDEX "Nominator_userId_key" ON "Nominator"("userId");
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
    "userId" TEXT NOT NULL,
    "nominatorId" TEXT NOT NULL,
    "adminId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Nominee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nominee_nominatorId_fkey" FOREIGN KEY ("nominatorId") REFERENCES "Nominator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nominee_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Nominee" ("aboutme", "address", "adminId", "deleted", "description", "id", "nominatorId", "occupation", "phoneNumber", "photoURL", "placeOfWork", "slug", "status", "userId") SELECT "aboutme", "address", "adminId", "deleted", "description", "id", "nominatorId", "occupation", "phoneNumber", "photoURL", "placeOfWork", "slug", "status", "userId" FROM "Nominee";
DROP TABLE "Nominee";
ALTER TABLE "new_Nominee" RENAME TO "Nominee";
CREATE UNIQUE INDEX "Nominee_slug_key" ON "Nominee"("slug");
CREATE UNIQUE INDEX "Nominee_userId_key" ON "Nominee"("userId");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_user" ("createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "updatedAt") SELECT "createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
