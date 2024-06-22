-- CreateTable
CREATE TABLE "KudosBoard" (
    "id" SERIAL NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KudosBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KudosCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "KBid" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "owner" TEXT,

    CONSTRAINT "KudosCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KudosBoard_id_key" ON "KudosBoard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KudosCard_id_key" ON "KudosCard"("id");
