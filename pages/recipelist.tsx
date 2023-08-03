import { prisma } from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

// async function getData() {
//     let response = await fetch("http://localhost:3000/api/getRecipes")
//     return response.json();
//     console.log(response);
    
// }

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function recipeList({data} : Props) {    
    return(
        <div>
            <button className="btn"><Link href='/'>Back to homepage</Link></button>
            <div>Recipes</div>
            <div>{String(data.name)}</div>
        </div>
    )
}
export const getServerSideProps : GetServerSideProps = async()=>{
    const data = await prisma.recipe.findFirst({
    })
    return {
        props:{
            data
        }
    }
}