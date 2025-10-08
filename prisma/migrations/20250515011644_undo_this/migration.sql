/*
  Warnings:

  - You are about to drop the column `photoURL` on the `nominee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `emailtemplate` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `nominee` DROP COLUMN `photoURL`;
