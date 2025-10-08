/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Nominator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Nominator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Nominator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Nominator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Nominator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Nominator` ADD COLUMN `adminId` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Nominator_email_key` ON `Nominator`(`email`);

-- AddForeignKey
ALTER TABLE `Nominator` ADD CONSTRAINT `Nominator_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
