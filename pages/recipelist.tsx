import { prisma } from "@/lib/prisma";
import { Props } from "@/types/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

// async function getData() {
//     let response = await fetch("http://localhost:3000/api/getRecipes")
//     return response.json();
//     console.log(response);

// }


export default function recipeList({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Tags</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e : any)=>(
            <tr>
            <th>{e?.id}</th>
            <td>{e?.name}</td>
            <td></td>
            <td><button className="btn btn-outline"><Link href={`recipe/${e.id}`}>Details</Link></button></td>
          </tr>
          
          ))}
        </tbody>
      </table>
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
