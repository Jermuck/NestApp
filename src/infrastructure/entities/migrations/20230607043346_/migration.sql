/*
  Warnings:

  - You are about to drop the `_FriendsToUsers` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `FriendEntity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FriendEntity" DROP CONSTRAINT "FriendEntity_userId_fkey";

-- DropForeignKey
ALTER TABLE "_FriendsToUsers" DROP CONSTRAINT "_FriendsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_FriendsToUsers" DROP CONSTRAINT "_FriendsToUsers_B_fkey";

-- AlterTable
ALTER TABLE "FriendEntity" ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "_FriendsToUsers";

-- AddForeignKey
ALTER TABLE "FriendEntity" ADD CONSTRAINT "FriendEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
