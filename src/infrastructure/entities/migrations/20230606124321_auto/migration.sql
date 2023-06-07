/*
  Warnings:

  - You are about to drop the `FriendEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FriendsToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FriendEntity" DROP CONSTRAINT "FriendEntity_userId_fkey";

-- DropForeignKey
ALTER TABLE "TokenEntity" DROP CONSTRAINT "TokenEntity_userId_fkey";

-- DropForeignKey
ALTER TABLE "_FriendsToUsers" DROP CONSTRAINT "_FriendsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_FriendsToUsers" DROP CONSTRAINT "_FriendsToUsers_B_fkey";

-- DropTable
DROP TABLE "FriendEntity";

-- DropTable
DROP TABLE "TokenEntity";

-- DropTable
DROP TABLE "UserEntity";

-- DropTable
DROP TABLE "_FriendsToUsers";

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "PK_767b684bd5061a45b1fc688e36f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "PK_47b543436b0189860e4e01c7e14" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "CreateTime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateTime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR,
    "tokenId" INTEGER,
    "friendsId" INTEGER,

    CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_7a0d6e2034785428b102e216452" ON "Friends"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_3c3ab3f49a87e6ddb607f3c4945" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "REL_3c6cabe50889f97af2606cd4fc" ON "Users"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_cf80fec9008b7478941e0482753" ON "Users"("friendsId");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "FK_7a0d6e2034785428b102e216452" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "FK_3c6cabe50889f97af2606cd4fc5" FOREIGN KEY ("tokenId") REFERENCES "Tokens"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "FK_cf80fec9008b7478941e0482753" FOREIGN KEY ("friendsId") REFERENCES "Friends"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
