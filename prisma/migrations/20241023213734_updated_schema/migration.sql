/*
  Warnings:

  - You are about to drop the column `adminId` on the `Nominator` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Nominator` DROP FOREIGN KEY `Nominator_adminId_fkey`;

-- AlterTable
ALTER TABLE `Nominator` DROP COLUMN `adminId`;

-- AlterTable
ALTER TABLE `Nominee` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
