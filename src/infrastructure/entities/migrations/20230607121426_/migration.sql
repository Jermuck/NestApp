/*
  Warnings:

  - You are about to drop the column `name` on the `BookEntity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameBook]` on the table `BookEntity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameBook` to the `BookEntity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BookEntity_name_key";

-- AlterTable
ALTER TABLE "BookEntity" DROP COLUMN "name",
ADD COLUMN     "nameBook" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BookEntity_nameBook_key" ON "BookEntity"("nameBook");
