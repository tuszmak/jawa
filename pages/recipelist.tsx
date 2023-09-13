import Card from "@/components/Card";
import DeleteRecipe from "@/components/recipeList/DeleteRecipe";
import { prisma } from "@/lib/prisma";
import { Props, Recipe } from "@/types/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidPlusCircle } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";

interface IRecipeListProps {
  data: Recipe[];
}

export default function RecipeList({ data }: IRecipeListProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Recipe[]>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const filtered = data.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchValue, data]);
  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <div className="overflow-x-auto w-screen lg:w-2/3 mt-4 h-screen flex flex-col bg-white">
        <div className="flex justify-between gap-4 items-baseline">
          <div className="m-4">
            <button className="btn btn-outline hover:btn-primary">
              <Link href="/">Back</Link>
            </button>
          </div>

          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={searchValue}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="tooltip tooltip-left" data-tip="Add new recipe">
            <Link href="/addrecipe">
              <BiSolidPlusCircle size="64px" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 self-center">
          {filteredData?.map((e: Recipe, i: number) => {
            return <Card key={i} recipe={e} />;
          })}
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.recipe.findMany({
    include: { tag_list: true },
    orderBy: {
      id: "asc",
    },
  });
  return {
    props: {
      data,
    },
  };
};
