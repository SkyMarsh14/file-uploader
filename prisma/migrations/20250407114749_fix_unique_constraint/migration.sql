/*
  Warnings:

  - A unique constraint covering the columns `[folderName,parentFolderId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Folder_folderName_key";

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "parentFolderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_folderName_parentFolderId_key" ON "Folder"("folderName", "parentFolderId");
