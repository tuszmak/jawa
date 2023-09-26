import { prisma } from "@/lib/prisma";
import { ModifiableRecipe, NewRecipe, Recipe, Tag } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const recipe: ModifiableRecipe = req.body;
    const tagObjects: Tag[] = [];
    await Promise.all(
      recipe.tag_list?.map(async (tag: any) => {
        let tagObject = await prisma.tag.findFirst({
          where: {
            name: { equals: tag?.name || tag },
          },
        });
        if (tagObject) {
          tagObjects.push(tagObject);
        } else {
          let newTag = await prisma.tag.create({
            data: {
              name: tag,
            },
          });
          tagObjects.push(newTag);
        }
      })
    );
    const data = {
      id: recipe.id,
      name: recipe.name,
      ingredient_list: recipe.ingredient_list,
      instructions: recipe.instructions,
      tag_list: recipe.tag_list,
    };
    const response = await prisma.recipe.update({
      data: {
        id: recipe.id,
        name: recipe.name,
        ingredient_id_list: {
          connect: recipe.ingredient_list,
        },
        instructions: recipe.instructions,
        tag_list: {
          connect: tagObjects,
        },
      },
      where: {
        id: recipe.id,
      },
    });
  }

  res.status(200).json({ text: "Hello" });
}
