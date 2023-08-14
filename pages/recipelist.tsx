import { prisma } from "@/lib/prisma";
import { Props, Recipe } from "@/types/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import {BiSolidPlusCircle} from "react-icons/bi"

// async function getData() {
//     let response = await fetch("http://localhost:3000/api/getRecipes")
//     return response.json();
//     console.log(response);

// }
interface IRecipeListProps {
  data: Recipe[];
}

export default function recipeList({ data }: IRecipeListProps) {
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
  }, [searchValue]);
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
          {filteredData.map((e: Recipe, i: number) => (
            <tr key={i}>
              <th>{e?.id}</th>
              <td>{e?.name}</td>
              <td></td>
              <td>
                <button className="btn btn-outline">
                  <Link href={`recipe/${e.id}`}>Details</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bottom-5 fixed right-20 group flex items-center">
        <p className="opacity-0 group-hover:opacity-100 transition-opacity">Add new recipe</p>
        <Link href="/addRecipe"><BiSolidPlusCircle size="48px"/></Link>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.recipe.findMany({});
  return {
    props: {
      data,
    },
  };
};
