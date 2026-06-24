/*
  Warnings:

  - You are about to drop the column `duration` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Session` table. All the data in the column will be lost.
  - Added the required column `description` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "duration",
DROP COLUMN "notes",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "videoKey" TEXT,
ALTER COLUMN "summary" DROP NOT NULL,
ALTER COLUMN "recommendation" DROP NOT NULL;
