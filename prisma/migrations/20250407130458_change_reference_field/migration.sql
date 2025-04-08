/*
  Warnings:

  - A unique constraint covering the columns `[parentFolderId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_parentFolderId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Folder_parentFolderId_key" ON "Folder"("parentFolderId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folder"("parentFolderId") ON DELETE RESTRICT ON UPDATE CASCADE;
