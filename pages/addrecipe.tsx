import { prisma } from "@/lib/prisma";
import { Ingredient, NewRecipe } from "@/types/types";
import { GetServerSideProps } from "next";
import { IoMdClose } from "react-icons/io";
import React, { FormEvent, useState, useEffect, ChangeEvent } from "react";
interface IIngredientListProps {
  data: Ingredient[];
}
function AddRecipe({ data }: IIngredientListProps) {
  const [recipeName, setRecipeName] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<string>("");
  const [remainingIngredients, setRemainingIngredients] =
    useState<Ingredient[]>(data);
  const [remainingTags, setRemainingTags ] = useState([])

  const submitNewRecipe = () => {
    const ingredientIDs: number[] = [];
    ingredients.forEach((e) => ingredientIDs.push(e.id));
    const newRecipe: NewRecipe = {
      name: recipeName,
      ingredient_id_list: ingredients,
      instructions: instructions,
    };
    // const response = prisma.recipe.create({
    //   data: newRecipe
    // })
    // console.log(response);
    const response = fetch("/api/addRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
  };

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
      setIngredients(newIngredients);
    }
  };
  useEffect(() => {}, [recipeName, ingredients, instructions]);
  console.log(data);

  return (
    <div>
      <p>Add recipe</p>

      <label htmlFor="">Name:</label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setRecipeName(e.target.value)}
        value={recipeName}
        name="name"
      />
      {/* Ingredient select should have value of the ID not the name for easier placing. */}
      <select
        className="select select-primary w-full max-w-xs"
        value=""
        onChange={(e) => handleNewIngredient(e)}
      >
        <option>Pick an ingredient</option>
        {remainingTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <select
        className="select select-primary w-full max-w-xs"
        value=""
        onChange={(e) => handleNewIngredient(e)}
      >
        <option>Pick an ingredient</option>
        {remainingIngredients.map((ingredient) => (
          <option key={ingredient.name} value={ingredient.name}>
            {ingredient.name}
          </option>
        ))}
      </select>
      <label htmlFor="instructions">Instructions:</label>
      <textarea
        className="textarea"
        placeholder="Bio"
        name="instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      ></textarea>
      <button className="btn" type="button" onClick={submitNewRecipe}>
        Submit
      </button>
      <div>
        Selected ingredients :{" "}
        {ingredients.map((e) => (
          <p key={e.name}>
            {e.name} <IoMdClose />{" "}
          </p>
        ))}
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const data: Ingredient[] = await prisma.ingredient.findMany({});
  console.log(data);

  return {
    props: {
      data,
    },
  };
};
export default AddRecipe;
