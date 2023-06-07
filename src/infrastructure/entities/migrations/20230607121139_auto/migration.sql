/*
  Warnings:

  - You are about to drop the `FriendEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FriendsOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FriendsOnUsers" DROP CONSTRAINT "FriendsOnUsers_friendId_fkey";

-- DropForeignKey
ALTER TABLE "FriendsOnUsers" DROP CONSTRAINT "FriendsOnUsers_userId_fkey";

-- DropTable
DROP TABLE "FriendEntity";

-- DropTable
DROP TABLE "FriendsOnUsers";

-- CreateTable
CREATE TABLE "BookEntity" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER,
    "name" TEXT NOT NULL,
    "createData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "BookEntity_id_key" ON "BookEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookEntity_authorId_key" ON "BookEntity"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "BookEntity_name_key" ON "BookEntity"("name");

-- AddForeignKey
ALTER TABLE "BookEntity" ADD CONSTRAINT "BookEntity_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
