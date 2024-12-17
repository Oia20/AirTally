/*
  Warnings:

  - The primary key for the `Counters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Timers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_TimersToUser" DROP CONSTRAINT "_TimersToUser_A_fkey";

-- AlterTable
ALTER TABLE "Counters" DROP CONSTRAINT "Counters_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Counters_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Counters_id_seq";

-- AlterTable
ALTER TABLE "Timers" DROP CONSTRAINT "Timers_pkey",
ADD COLUMN     "step" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Timers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Timers_id_seq";

-- AlterTable
ALTER TABLE "_TimersToUser" ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_TimersToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TimersToUser_AB_unique";

-- AddForeignKey
ALTER TABLE "_TimersToUser" ADD CONSTRAINT "_TimersToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Timers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
