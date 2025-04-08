/*
  Warnings:

  - You are about to drop the column `rootFolderId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rootFolderId_fkey";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rootFolderId";

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
