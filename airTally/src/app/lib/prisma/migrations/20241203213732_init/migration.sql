/*
  Warnings:

  - The primary key for the `Folder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Counters" DROP CONSTRAINT "Counters_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_userId_fkey";

-- DropForeignKey
ALTER TABLE "Timers" DROP CONSTRAINT "Timers_folderId_fkey";

-- DropForeignKey
ALTER TABLE "_TimersToUser" DROP CONSTRAINT "_TimersToUser_B_fkey";

-- AlterTable
ALTER TABLE "Counters" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "folderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Folder_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Folder_id_seq";

-- AlterTable
ALTER TABLE "Timers" ALTER COLUMN "folderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_TimersToUser" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Timers" ADD CONSTRAINT "Timers_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Counters" ADD CONSTRAINT "Counters_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TimersToUser" ADD CONSTRAINT "_TimersToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
