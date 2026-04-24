/*
  Warnings:

  - You are about to drop the `MagicToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Nominator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Nominee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MagicToken_email_key";

-- DropIndex
DROP INDEX "MagicToken_token_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MagicToken";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" DATETIME,
    "refreshTokenExpiresAt" DATETIME,
    "scope" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "Position" TEXT NOT NULL,
    CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("Position", "id") SELECT "Position", "id" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");
CREATE TABLE "new_Nominator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Nominator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Nominator" ("email", "firstName", "id", "lastName") SELECT "email", "firstName", "id", "lastName" FROM "Nominator";
DROP TABLE "Nominator";
ALTER TABLE "new_Nominator" RENAME TO "Nominator";
CREATE UNIQUE INDEX "Nominator_email_key" ON "Nominator"("email");
CREATE UNIQUE INDEX "Nominator_userId_key" ON "Nominator"("userId");
CREATE TABLE "new_Nominee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "placeOfWork" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
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
INSERT INTO "new_Nominee" ("aboutme", "address", "adminId", "deleted", "description", "email", "firstName", "id", "lastName", "nominatorId", "occupation", "phoneNumber", "photoURL", "placeOfWork", "slug", "status") SELECT "aboutme", "address", "adminId", "deleted", "description", "email", "firstName", "id", "lastName", "nominatorId", "occupation", "phoneNumber", "photoURL", "placeOfWork", "slug", "status" FROM "Nominee";
DROP TABLE "Nominee";
ALTER TABLE "new_Nominee" RENAME TO "Nominee";
CREATE UNIQUE INDEX "Nominee_email_key" ON "Nominee"("email");
CREATE UNIQUE INDEX "Nominee_slug_key" ON "Nominee"("slug");
CREATE UNIQUE INDEX "Nominee_userId_key" ON "Nominee"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
