import DeleteRecipe from "@/components/recipeList/DeleteRecipe";
import { prisma } from "@/lib/prisma";
import { Props, Recipe } from "@/types/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidPlusCircle } from "react-icons/bi";

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
      recipe.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [searchValue, data]);
  return (
    <div className="overflow-x-auto h-screen">
      <div className="flex justify-between">
        <button className="btn btn-primary">
          <Link href="/">Back</Link>
        </button>

        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={searchValue}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Tags</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e: Recipe, i: number) => {
            return (
              <tr key={i}>
                <th>{e?.id}</th>
                <td>{e?.name}</td>
                <td>
                  <div>
                    {e?.tag_list?.map((tag) => <p key={tag.id}>{tag.name}</p>)}
                  </div>
                </td>
                <td>
                  <button className="btn btn-outline">
                    <Link href={`recipe/${e.id}`}>Details</Link>
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline">
                    <Link href={`modifyRecipe/${e.id}`}>Modify</Link>
                  </button>
                </td>
                <td>
                  <DeleteRecipe id={e.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bottom-5 fixed right-20 group flex items-center">
        <p className="opacity-0 group-hover:opacity-100 transition-opacity">
          Add new recipe
        </p>
        <Link href="/addrecipe">
          <BiSolidPlusCircle size="48px" />
        </Link>
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
