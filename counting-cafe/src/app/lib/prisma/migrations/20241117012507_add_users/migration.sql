/*
  Warnings:

  - You are about to drop the `CCCounters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CCFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CCTimers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CCUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CCTimersToCCUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CCCounters" DROP CONSTRAINT "CCCounters_folderId_fkey";

-- DropForeignKey
ALTER TABLE "CCFolder" DROP CONSTRAINT "CCFolder_userId_fkey";

-- DropForeignKey
ALTER TABLE "CCTimers" DROP CONSTRAINT "CCTimers_folderId_fkey";

-- DropForeignKey
ALTER TABLE "_CCTimersToCCUser" DROP CONSTRAINT "_CCTimersToCCUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CCTimersToCCUser" DROP CONSTRAINT "_CCTimersToCCUser_B_fkey";

-- DropTable
DROP TABLE "CCCounters";

-- DropTable
DROP TABLE "CCFolder";

-- DropTable
DROP TABLE "CCTimers";

-- DropTable
DROP TABLE "CCUser";

-- DropTable
DROP TABLE "_CCTimersToCCUser";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "increment" INTEGER NOT NULL,
    "initial" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,

    CONSTRAINT "Timers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "increment" INTEGER NOT NULL,
    "initial" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,

    CONSTRAINT "Counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TimersToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TimersToUser_AB_unique" ON "_TimersToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TimersToUser_B_index" ON "_TimersToUser"("B");

-- AddForeignKey
ALTER TABLE "Timers" ADD CONSTRAINT "Timers_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Counters" ADD CONSTRAINT "Counters_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TimersToUser" ADD CONSTRAINT "_TimersToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Timers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TimersToUser" ADD CONSTRAINT "_TimersToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
