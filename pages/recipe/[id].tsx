import { prisma } from "@/lib/prisma";
import { Props } from "@/types/types";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

let id : number;
export default function recipe({data}: Props) {
    const router = useRouter()
    if(router.query.id){
        id = parseInt(router.query.id.toString());
    }
    return(
        <div>
            <h1>{data.name}</h1>
            <Image src={`/recipe${id}.jpg`} width={450} height={450} alt="Image here" />
            <p>{data.instructions}</p>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    const data = await prisma.recipe.findFirst(
        {
            where: {
                id: id
            }
        }
    )
    return {
      props: {
        data,
      },
    };
  };
  