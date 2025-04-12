/*
  Warnings:

  - You are about to drop the column `extention` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "extention",
ADD COLUMN     "extension" TEXT;
