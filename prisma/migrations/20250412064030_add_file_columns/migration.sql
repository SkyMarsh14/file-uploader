-- AlterTable
ALTER TABLE "File" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "extention" TEXT,
ADD COLUMN     "size" TEXT;
