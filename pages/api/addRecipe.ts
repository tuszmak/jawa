import { prisma } from "@/lib/prisma";
import { NewRecipe } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const recipe: NewRecipe = req.body;
    console.log(recipe);
    await prisma.recipe.create({
      data: {
        name: recipe.name,
        ingredient_id_list: {
          connect: recipe.ingredient_id_list
        },
        instructions: recipe.instructions,
      },
      include: {
        ingredient_id_list: true,
      },
    });
  }

  res.status(200).json({ text: "Hello" });
}
