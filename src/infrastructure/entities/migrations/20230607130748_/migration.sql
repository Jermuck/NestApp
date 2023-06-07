/*
  Warnings:

  - You are about to drop the column `nameBook` on the `BookEntity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `BookEntity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `BookEntity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BookEntity_nameBook_key";

-- AlterTable
ALTER TABLE "BookEntity" DROP COLUMN "nameBook",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BookEntity_name_key" ON "BookEntity"("name");
