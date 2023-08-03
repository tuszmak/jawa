/*
  Warnings:

  - You are about to drop the column `ingredient_id_list` on the `recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "recipeId" INTEGER;

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "ingredient_id_list";

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "recipeId" INTEGER,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
