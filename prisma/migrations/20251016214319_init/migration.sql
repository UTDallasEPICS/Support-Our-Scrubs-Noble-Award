-- CreateTable
CREATE TABLE "Nominator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Nominee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "placeOfWork" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nominatorId" TEXT NOT NULL,
    "adminId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DENIED',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Nominee_nominatorId_fkey" FOREIGN KEY ("nominatorId") REFERENCES "Nominator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nominee_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MagicToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "Position" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Nominator_email_key" ON "Nominator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Nominee_slug_key" ON "Nominee"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MagicToken_token_key" ON "MagicToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "EmailTemplate_type_key" ON "EmailTemplate"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
