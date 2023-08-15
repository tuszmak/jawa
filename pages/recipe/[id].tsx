import { prisma } from "@/lib/prisma";
import { Ingredient, Props, Recipe } from "@/types/types";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface IRecipeProps {
  data: Recipe;
  ingredients: Ingredient[];
}
export default function Recipe({ data, ingredients }: IRecipeProps) {
  let id = 0;

  const router = useRouter();
  if (router.query.id) {
    id = parseInt(router.query.id.toString());
  }
  
  return (
    <div>
      <button className="btn btn-primary">
        <Link href="/recipelist">Back to list</Link>
      </button>
      <h1>{data.name}</h1>
      <Image
        src={`/recipe${id}.jpg`}
        width={450}
        height={450}
        alt="Image here"
      />
      {ingredients.map((e: Ingredient) => (
        <p key={e.name}>{e.name}</p>
      ))}
      <p>{data.instructions}</p>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = parseInt(context?.query?.id?.toString() || "")
    
  const data = await prisma.recipe.findFirst({
    where: {
      id: id,
    },
    include: {
      ingredient_id_list: true,
    },
  });
  const ingredients = await prisma.ingredient.findMany({
    where: {
      id: { in: data?.ingredient_id_list.map((e) => e.id) },
    },
  });
  return {
    props: {
      data,
      ingredients,
    },
  };
};
