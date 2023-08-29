import { prisma } from "@/lib/prisma";
import { Ingredient, ModifiableRecipe, NewRecipe, Recipe, Tag } from "@/types/types";
import { GetServerSideProps } from "next";
import { IoMdClose } from "react-icons/io";
import {ChangeEvent, useEffect, useState} from "react"
import TextInput from "@/components/recipe/RecipeNameInput";
import Link from "next/link";
import TagInput from "@/components/recipe/RecipeTagInput";
import RecipeIngredientPicker from "@/components/recipe/RecipeIngredientPicker";
import RecipeInstructions from "@/components/recipe/RecipeInstructions";

interface ModifyRecipeProps {
  id: number
    recipe: ModifiableRecipe,
    ingredients: Ingredient[],
    tags: Tag[],
}

export default function modifyRecipe({id,recipe,ingredients,tags} : ModifyRecipeProps) {
  const [recipeName, setRecipeName] = useState<string>("");
  const [currentIngredients, setCurrentIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [remainingIngredients, setRemainingIngredients] =
    useState<Ingredient[]>([]);
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
    const response = fetch("/api/addRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
  };
  useEffect(()=>{
    const filteredIngredients = ingredients.filter(ingredient => !currentIngredients.includes(ingredient))
    setRemainingIngredients(filteredIngredients)
  },[])
  const handleNewIngredient = (event: ChangeEvent<HTMLSelectElement>) => {
    const searchIngredient = event.target.value;
    const newIngredients = structuredClone(ingredients);
    const newRemIngredients = structuredClone(remainingIngredients);

    const ingredientInTheData = newRemIngredients.find(
      (e) => e.name === searchIngredient
    );
    if (ingredientInTheData) {
      newRemIngredients.splice(newRemIngredients.indexOf(ingredientInTheData));
      newIngredients.push(ingredientInTheData);
      setRemainingIngredients(newRemIngredients);
      setCurrentIngredients(newIngredients);
    }
  };

  useEffect(() => {}, [recipeName, ingredients, instructions, currentTag]);
  console.log("Tags here: " + selectedTags);

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
            {e.name} <IoMdClose />
          </p>
        ))}
      </div>
      <div>
        Selected tags :
        {selectedTags.map((e) => (
          <p key={e}>
            {e} <IoMdClose />
          </p>
        ))}
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = parseInt(context?.query?.id?.toString() || "")

    const recipe = await prisma.recipe.findFirst({
        where: {
            id: id
        },
        include:{
           ingredient_id_list:true
        }
    })
    const ingredients: Ingredient[] = await prisma.ingredient.findMany({});
    const tags: Tag[] = await prisma.tag.findMany({});

    return {
        props: {
          id: id,
            recipe: recipe,
            ingredients: ingredients,
            tags: tags
        }
    }
}