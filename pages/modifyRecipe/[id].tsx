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
import { useEffect, useState } from "react";
import TextInput from "@/components/recipe/RecipeNameInput";
import Link from "next/link";
import TagInput from "@/components/recipe/RecipeTagInput";
import RecipeIngredientPicker from "@/components/recipe/RecipeIngredientPicker";
import RecipeInstructions from "@/components/recipe/RecipeInstructions";
import {
  moveIngredients,
  moveIngredientsForDelete,
} from "@/lib/recipeHandleMethods";
import { useRouter } from "next/router";

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
  const [recipeName, setRecipeName] = useState<string>(recipe.name || "");
  const [currentIngredients, setCurrentIngredients] = useState<Ingredient[]>(
    recipe.ingredient_list || []
  );
  const [instructions, setInstructions] = useState<string>(recipe.instructions);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    recipe.tag_list || []
  );
  const [remainingIngredients, setRemainingIngredients] = useState<
    Ingredient[]
  >([]);
  const router = useRouter();
  const submitNewRecipe = async () => {
    const ingredientIDs: number[] = [];
    ingredients.forEach((e) => ingredientIDs.push(e.id));
    const newRecipe: ModifiableRecipe = {
      id: id,
      name: recipeName,
      ingredient_list: ingredients,
      instructions: instructions,
      tag_list: selectedTags,
    };
    const response = await fetch("/api/modifyRecipe", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
    if (response.ok) router.push("/recipelist");
  };
  useEffect(() => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => !currentIngredients.includes(ingredient)
    );
    setRemainingIngredients(filteredIngredients);
  }, []);
  const handleNewIngredient = (ingredientName: string) => {
    const [newIngredients, newRemIngredients] = moveIngredients(
      ingredientName,
      currentIngredients,
      remainingIngredients
    );
    setRemainingIngredients(newRemIngredients);
    setCurrentIngredients(newIngredients);
  };
  const handleDeleteIngredient = (element: Ingredient) => {
    const { newIngredients, newRemainingIngredients } =
      moveIngredientsForDelete(
        element,
        ingredients,
        currentIngredients,
        remainingIngredients
      );

    setCurrentIngredients(newIngredients);
    setRemainingIngredients(newRemainingIngredients);
  };
  const handleDeleteTag = (element: string) => {
    const newTags = selectedTags.filter((e) => e !== element);
    setSelectedTags(newTags);
  };

  useEffect(() => {}, [recipeName, ingredients, instructions]);

  return (
    <div className="flex flex-col">
      <div>
        <button className="btn">
          <Link href="/recipelist">Back to list</Link>
        </button>
        <p className="text-3xl">Modify recipe</p>
      </div>
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

      <div>
        Selected ingredients :
        {currentIngredients.map((e: Ingredient) => (
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
        {selectedTags.map((e: any) => {          
          return (
            <p key={JSON.stringify(e)}>
              {e.name || e}
              <button onClick={() => handleDeleteTag(e)}>
                <IoMdClose />
              </button>
            </p>
          );
        })}
      </div>
      <div className="flex justify-center mt-11">
        <button
          className="btn btn-primary"
          type="button"
          onClick={submitNewRecipe}
        >
          Submit
        </button>
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
      tag_list: true,
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
