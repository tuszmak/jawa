import { prisma } from "@/lib/prisma";
import {
  Ingredient,
  ModifiableRecipe,
  NewRecipe,
  Recipe,
  Tag,
} from "@/types/types";
import { GetServerSideProps } from "next";
import { IoMdClose } from "react-icons/io";
import { ChangeEvent, useEffect, useState } from "react";
import TextInput from "@/components/recipe/RecipeNameInput";
import Link from "next/link";
import TagInput from "@/components/recipe/RecipeTagInput";
import RecipeIngredientPicker from "@/components/recipe/RecipeIngredientPicker";
import RecipeInstructions from "@/components/recipe/RecipeInstructions";
import { moveIngredients } from "@/lib/recipeHandleMethods";

interface ModifyRecipeProps {
  id: number;
  recipe: ModifiableRecipe;
  ingredients: Ingredient[];
  tags: Tag[];
}

export default function ModifyRecipe({
  id,
  recipe,
  ingredients,
  tags,
}: ModifyRecipeProps) {
  const [recipeName, setRecipeName] = useState<string>("");
  const [currentIngredients, setCurrentIngredients] =
    useState<Ingredient[]>(ingredients);
  const [instructions, setInstructions] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [remainingIngredients, setRemainingIngredients] = useState<
    Ingredient[]
  >([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const submitNewRecipe = () => {
    const ingredientIDs: number[] = [];
    ingredients.forEach((e) => ingredientIDs.push(e.id));
    const newRecipe: ModifiableRecipe = {
      id: id,
      name: recipeName,
      ingredient_list: ingredients,
      instructions: instructions,
      tag_list: selectedTags,
    };
    const response = fetch("/api/modifyRecipe", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
  };
  useEffect(() => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => !currentIngredients.includes(ingredient),
    );
    setRemainingIngredients(filteredIngredients);
  }, []);
  const handleNewIngredient = (ingredientName: string) => {
    const [newIngredients, newRemIngredients] = moveIngredients(
      ingredientName,
      currentIngredients,
      remainingIngredients,
    );
    setRemainingIngredients(newRemIngredients);
    setCurrentIngredients(newIngredients);
  };
  const handleDeleteIngredient = (element: Ingredient) => {
    const indexOfIngredient = ingredients.indexOf(element);
    const newIngredients = structuredClone(currentIngredients);
    const newRemainingIngredients = structuredClone(remainingIngredients);
    newIngredients.splice(indexOfIngredient, 1);
    newRemainingIngredients.push(element);

    setCurrentIngredients(newIngredients);
    setRemainingIngredients(newRemainingIngredients);
  };
  const handleDeleteTag = (element: string) => {
    const newTags = selectedTags.filter((e) => e !== element);
    setSelectedTags(newTags);
  };

  useEffect(() => {}, [recipeName, ingredients, instructions, currentTag]);

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
        {currentIngredients.map((e) => (
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
            {e}{" "}
            <button onClick={() => handleDeleteTag(e)}>
              <IoMdClose />
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context?.query?.id?.toString() || "");

  const recipe = await prisma.recipe.findFirst({
    where: {
      id: id,
    },
    include: {
      ingredient_id_list: true,
    },
  });
  const ingredients: Ingredient[] = await prisma.ingredient.findMany({});
  const tags: Tag[] = await prisma.tag.findMany({});

  return {
    props: {
      id: id,
      recipe: recipe,
      ingredients: ingredients,
      tags: tags,
    },
  };
};
