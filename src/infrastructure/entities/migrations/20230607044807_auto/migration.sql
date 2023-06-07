/*
  Warnings:

  - You are about to drop the column `userId` on the `FriendEntity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FriendEntity" DROP CONSTRAINT "FriendEntity_userId_fkey";

-- DropIndex
DROP INDEX "FriendEntity_userId_key";

-- AlterTable
ALTER TABLE "FriendEntity" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "FriendsOnUsers" (
    "userId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,

    CONSTRAINT "FriendsOnUsers_pkey" PRIMARY KEY ("userId","friendId")
);

-- AddForeignKey
ALTER TABLE "FriendsOnUsers" ADD CONSTRAINT "FriendsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsOnUsers" ADD CONSTRAINT "FriendsOnUsers_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "FriendEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
