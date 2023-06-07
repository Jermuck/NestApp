/*
  Warnings:

  - Made the column `authorId` on table `BookEntity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BookEntity" DROP CONSTRAINT "BookEntity_authorId_fkey";

-- AlterTable
ALTER TABLE "BookEntity" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BookEntity" ADD CONSTRAINT "BookEntity_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
