-- CreateTable
CREATE TABLE "CCUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "CCUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CCTimers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "increment" INTEGER NOT NULL,
    "initial" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,

    CONSTRAINT "CCTimers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CCFolder" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CCFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CCCounters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "increment" INTEGER NOT NULL,
    "initial" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,

    CONSTRAINT "CCCounters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CCTimersToCCUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CCUser_email_key" ON "CCUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CCTimersToCCUser_AB_unique" ON "_CCTimersToCCUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CCTimersToCCUser_B_index" ON "_CCTimersToCCUser"("B");

-- AddForeignKey
ALTER TABLE "CCTimers" ADD CONSTRAINT "CCTimers_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "CCFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CCFolder" ADD CONSTRAINT "CCFolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "CCUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CCCounters" ADD CONSTRAINT "CCCounters_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "CCFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CCTimersToCCUser" ADD CONSTRAINT "_CCTimersToCCUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CCTimers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CCTimersToCCUser" ADD CONSTRAINT "_CCTimersToCCUser_B_fkey" FOREIGN KEY ("B") REFERENCES "CCUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
