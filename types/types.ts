import { getServerSideProps } from "@/pages/recipelist";
import { InferGetServerSidePropsType } from "next";

export type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export type Ingredient = {
    id: number,
    name: string;
    recipeId : number | null
}
export type Recipe = {
    id: number,
    name: string,
    ingredients : number[],
    instructions : string
}
export type NewRecipe = {
    name: string,
    ingredient_id_list : Ingredient[],
    instructions : string
}