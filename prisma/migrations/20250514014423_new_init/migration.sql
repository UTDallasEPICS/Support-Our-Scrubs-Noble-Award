/*
  Warnings:

  - You are about to drop the column `password` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `nominator` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `nominator` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `nominee` DROP FOREIGN KEY `Nominee_adminId_fkey`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `nominator` DROP COLUMN `password`,
    DROP COLUMN `username`;

-- AlterTable
ALTER TABLE `nominee` MODIFY `description` TEXT NOT NULL,
    MODIFY `adminId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `MagicToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MagicToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailTemplate` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('SIGNUP', 'NOMINATION', 'ACCEPTED', 'REJECTED') NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EmailTemplate_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_email_key` ON `Admin`(`email`);

-- AddForeignKey
ALTER TABLE `Nominee` ADD CONSTRAINT `Nominee_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
