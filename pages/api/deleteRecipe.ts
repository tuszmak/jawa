import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id: number = req.body;
  if (req.method === "DELETE") {
    try {
      await prisma.recipe.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
    res.status(200);
    res.send("");
  }
}
