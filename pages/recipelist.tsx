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
      <div className="overflow-x-auto w-2/3 mt-4 h-screen flex flex-col bg-white">
        <div className="flex justify-between gap-4">
          <div className="m-4">
            <button className="btn btn-primary">
              <Link href="/">Back</Link>
            </button>
          </div>

          <div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={searchValue}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div>{
          filteredData?.map((e: Recipe, i: number)=>{
            return(
              <Card key={i} />
            )
          })}</div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((e: Recipe, i: number) => {
              return (
                <tr key={i}>
                  <th>{e?.id}</th>
                  <td>{e?.name}</td>
                  <td>
                    <div>
                      {e?.tag_list?.map((tag) => (
                        <p key={tag.id}>{tag.name}</p>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0}>
                        <RxHamburgerMenu />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <Link href={`recipe/${e.id}`}>Details</Link>
                        </li>
                        <li>
                          <Link href={`modifyRecipe/${e.id}`}>Modify</Link>
                        </li>
                        <li>
                          <DeleteRecipe id={e.id} />
                        </li>
                      </ul>
                    </div>
                    {/* <div>
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
                </button> */}
                  </td>
                  {/* <td>
                <DeleteRecipe id={e.id} />
              </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bottom-5 fixed right-10 group flex items-center">
          <p className="opacity-0 group-hover:opacity-100 transition-opacity">
            Add new recipe
          </p>
          <Link href="/addrecipe">
            <BiSolidPlusCircle size="64px" />
          </Link>
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
