-- CreateTable
CREATE TABLE "UserEntity" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "UserEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenEntity" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER
);

-- CreateTable
CREATE TABLE "FriendEntity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "FriendEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FriendsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_id_key" ON "UserEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_email_key" ON "UserEntity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TokenEntity_id_key" ON "TokenEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TokenEntity_userId_key" ON "TokenEntity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendEntity_id_key" ON "FriendEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FriendEntity_userId_key" ON "FriendEntity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_FriendsToUsers_AB_unique" ON "_FriendsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendsToUsers_B_index" ON "_FriendsToUsers"("B");

-- AddForeignKey
ALTER TABLE "TokenEntity" ADD CONSTRAINT "TokenEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendEntity" ADD CONSTRAINT "FriendEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendsToUsers" ADD CONSTRAINT "_FriendsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "FriendEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendsToUsers" ADD CONSTRAINT "_FriendsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "UserEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
