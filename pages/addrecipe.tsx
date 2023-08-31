import { prisma } from "@/lib/prisma";
import { Ingredient, NewRecipe, Tag } from "@/types/types";
import { GetServerSideProps } from "next";
import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import TagInput from "@/components/recipe/RecipeTagInput";
import TextInput from "@/components/recipe/RecipeNameInput";
import RecipeIngredientPicker from "@/components/recipe/RecipeIngredientPicker";
import RecipeInstructions from "@/components/recipe/RecipeInstructions";
import { moveIngredients } from "@/lib/recipeHandleMethods";
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
  const submitNewRecipe = () => {
    const ingredientIDs: number[] = [];
    ingredients.forEach((e) => ingredientIDs.push(e.id));
    const newRecipe: NewRecipe = {
      name: recipeName,
      ingredient_id_list: ingredients,
      instructions: instructions,
      tags: selectedTags,
    };
    const response = fetch("/api/addRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
  };

  const handleNewIngredient = (ingredientName : string) => {
    const searchIngredient = ingredientName;
    const [newIngredients, newRemIngredients] = moveIngredients(
      searchIngredient,
      ingredients,
      remainingIngredients
    );
    setRemainingIngredients(newRemIngredients);
    setIngredients(newIngredients);
  };
  const handleDeleteIngredient = (element: Ingredient) => {
    const indexOfIngredient = ingredients.indexOf(element);
    const newIngredients = structuredClone(ingredients);
    const newRemainingIngredients = structuredClone(remainingIngredients);
    newIngredients.splice(indexOfIngredient, 1);
    newRemainingIngredients.push(element);
    setIngredients(newIngredients);
    setRemainingIngredients(newRemainingIngredients);
  };
  const handleDeleteTag = (element: string) => {
    const newTags = selectedTags.filter((e) => e !== element);
    setSelectedTags(newTags);
  };

  useEffect(() => {}, [recipeName, ingredients, instructions]);
  return (
    <div className="flex flex-col">
      <button className="btn">
        <Link href="/recipelist">Back to list</Link>
      </button>
      <p>Add recipe</p>

      <TextInput
        key="textInput"
        recipeName={recipeName}
        setRecipeName={setRecipeName}
      />
      <TagInput
        key="tagInput"
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <RecipeIngredientPicker
        key="RecipeIngredientPicker"
        remainingIngredients={remainingIngredients}
        handleNewIngredient={handleNewIngredient}
      />

      <RecipeInstructions
        key="recipeInstructions"
        instructions={instructions}
        setInstructions={setInstructions}
      />
      <button className="btn" type="button" onClick={submitNewRecipe}>
        Submit
      </button>
      <div>
        Selected ingredients :
        {ingredients.map((e) => (
          <p key={e.name}>
            {e.name}
            <button onClick={() => handleDeleteIngredient(e)}>
              <IoMdClose />
            </button>
          </p>
        ))}
      </div>
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
