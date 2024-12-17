/*
  Warnings:

  - You are about to drop the `Timers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TimersToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Timers" DROP CONSTRAINT "Timers_folderId_fkey";

-- DropForeignKey
ALTER TABLE "_TimersToUser" DROP CONSTRAINT "_TimersToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TimersToUser" DROP CONSTRAINT "_TimersToUser_B_fkey";

-- AlterTable
ALTER TABLE "Counters" ADD COLUMN     "step" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "viewMode" TEXT NOT NULL DEFAULT 'card';

-- DropTable
DROP TABLE "Timers";

-- DropTable
DROP TABLE "_TimersToUser";
