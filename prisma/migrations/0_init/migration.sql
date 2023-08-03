-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "instructions" TEXT,
    "ingredient_id_list" INTEGER[],

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

