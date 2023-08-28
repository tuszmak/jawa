import { prisma } from "@/lib/prisma";
import { NewRecipe, Tag } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const recipe: NewRecipe = req.body;
    console.log("These are the tag strings from the frontend: " + recipe.tags);

    const tagObjects: Tag[] = [];

    await Promise.all(
      recipe.tags.map(async (tag) => {
        console.log("I'm searching for this: " + tag);

        let tagObject = await prisma.tag.findFirst({
          where: {
            name: { equals: tag },
          },
        });
        console.log("I got this! " + tagObject);

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
    console.log("These are the tags:" + tagObjects);

    await prisma.recipe.create({
      data: {
        name: recipe.name,
        ingredient_id_list: {
          connect: recipe.ingredient_id_list,
        },
        instructions: recipe.instructions,
        tag_list:
          {
            connect: tagObjects,
          } || null,
      },
      include: {
        ingredient_id_list: true,
        tag_list: true,
      },
    });
  }

  res.status(200).json({ text: "Hello" });
}
