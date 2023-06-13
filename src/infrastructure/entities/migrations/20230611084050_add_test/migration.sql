-- CreateTable
CREATE TABLE "Testing" (
    "id" SERIAL NOT NULL,
    "lmn" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Testing_id_key" ON "Testing"("id");
