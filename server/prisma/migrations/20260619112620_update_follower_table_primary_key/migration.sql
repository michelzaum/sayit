/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Follower` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("user_followed_id", "followed_by_user_id");
