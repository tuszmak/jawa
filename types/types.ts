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
    instructions : string
    ingredient_id_list: number[]
}
export type NewRecipe = {
    name: string,
    ingredient_id_list : Ingredient[],
    instructions : string
}
export type Tag = {
    id: number,
    name: string,
    recipeId: number | null

}