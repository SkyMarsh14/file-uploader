/*
  Warnings:

  - You are about to drop the column `parentFolderId` on the `File` table. All the data in the column will be lost.
  - Added the required column `folderId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_parentFolderId_fkey";

-- DropIndex
DROP INDEX "Folder_parentFolderId_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "parentFolderId",
ADD COLUMN     "folderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
