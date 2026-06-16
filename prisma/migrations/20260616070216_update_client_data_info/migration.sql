/*
  Warnings:

  - Added the required column `age` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
