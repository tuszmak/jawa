import { prisma } from "@/lib/prisma";
import { Ingredient, NewRecipe, Tag } from "@/types/types";
import { GetServerSideProps } from "next";
import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect  } from "react";
import Link from "next/link";
import TagInput from "@/components/recipe/RecipeTagInput";
import TextInput from "@/components/recipe/RecipeNameInput";
import RecipeIngredientPicker from "@/components/recipe/RecipeIngredientPicker";
import RecipeInstructions from "@/components/recipe/RecipeInstructions";
import {
  moveIngredients,
  moveIngredientsForDelete,
} from "@/lib/recipeHandleMethods";
import { useRouter } from "next/router";
interface IIngredientListProps {
  data: Ingredient[];
  tags: Tag[];
}
function AddRecipe({ data, tags }: IIngredientListProps) {
  const [recipeName, setRecipeName] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [remainingIngredients, setRemainingIngredients] =
  useState<Ingredient[]>(data);
  const router = useRouter();
  const submitNewRecipe = async() => {
    const ingredientIDs: number[] = [];
    ingredients.forEach((e) => ingredientIDs.push(e.id));
    const newRecipe: NewRecipe = {
      name: recipeName,
      ingredient_id_list: ingredients,
      instructions: instructions,
      tags: selectedTags,
    };
    const response = await fetch("/api/addRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
    if(response.ok) {
        router.push("/recipelist")
    }
  };

  const handleNewIngredient = (ingredientName: string) => {
    const searchIngredient = ingredientName;
    const [newIngredients, newRemIngredients] = moveIngredients(
      searchIngredient,
      ingredients,
      remainingIngredients,
    );
    setRemainingIngredients(newRemIngredients);
    setIngredients(newIngredients);
  };
  const handleDeleteIngredient = (element: Ingredient) => {
    const { newIngredients, newRemainingIngredients } =
      moveIngredientsForDelete(
        element,
        data,
        ingredients,
        remainingIngredients,
      );
    setIngredients(newIngredients);
    setRemainingIngredients(newRemainingIngredients);
  };
  const handleDeleteTag = (element: string) => {
    const newTags = selectedTags.filter((e) => e !== element);
    setSelectedTags(newTags);
  };

  useEffect(() => {}, [recipeName, ingredients, instructions]);
  return (
    <div className="flex flex-col flex gap-8">
      <div className="flex gap-7">
        <button className="btn">
          <Link href="/recipelist">Back to list</Link>
        </button>
        <p className="text-2xl">Add new recipe</p>
      </div>
      <div className="flex flex-col justify-start items-center">
        {/* TODO Photo input */}
        <TextInput
          key="textInput"
          recipeName={recipeName}
          setRecipeName={setRecipeName}
        />
        <RecipeIngredientPicker
          key="RecipeIngredientPicker"
          remainingIngredients={remainingIngredients}
          handleNewIngredient={handleNewIngredient}
        />
        <div className="flex">
          Selected ingredients :
          {ingredients.map((e) => (
            <p key={e.name}>
              <div className="bg-white p-2 flex items-baseline">
                {e.name}
                <button onClick={() => handleDeleteIngredient(e)}>
                  <IoMdClose />
                </button>
              </div>
            </p>
          ))}
        </div>

        <TagInput
          key="tagInput"
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        <div>
          Selected tags :
          {selectedTags.map((e) => (
            <p key={e}>
              {e}
              <button onClick={() => handleDeleteTag(e)}>
                <IoMdClose />
              </button>
            </p>
          ))}
        </div>
        <RecipeInstructions
          key="recipeInstructions"
          instructions={instructions}
          setInstructions={setInstructions}
        />
        <button className="btn" type="button" onClick={submitNewRecipe}>
          Submit
        </button>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const ingredients: Ingredient[] = await prisma.ingredient.findMany({});
  const tags: Tag[] = await prisma.tag.findMany({});

  return {
    props: {
      data: ingredients,
      tags: tags,
    },
  };
};
export default AddRecipe;
