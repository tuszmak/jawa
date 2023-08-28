import { prisma } from "@/lib/prisma";
import { Ingredient, NewRecipe, Tag } from "@/types/types";
import { GetServerSideProps } from "next";
import { IoMdClose } from "react-icons/io";
import React, { FormEvent, useState, useEffect, ChangeEvent } from "react";
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
  const [remainingTags, setRemainingTags] = useState(tags);
  const [currentTag, setCurrentTag] = useState<string>("");
  console.log(currentTag);

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
  const handleSelectTag = () => {
    const searchTag = currentTag;
    if (selectedTags.includes(searchTag)) {
    } else {
      const newTags = structuredClone(selectedTags);
      const newRemTags = structuredClone(remainingTags);

      const tagInTheData = newRemTags.find((e) => e.name === searchTag);
      if (tagInTheData) {
        newRemTags.splice(newRemTags.indexOf(tagInTheData));
        setRemainingTags(newRemTags);
      }
      newTags.push(searchTag);
      setSelectedTags(newTags);
    }
  };
  useEffect(() => {}, [recipeName, ingredients, instructions, currentTag]);
  console.log("Tags here: " + selectedTags);
  
  return (
    <div className="flex flex-col">
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
      <label htmlFor="tags">Choose a tag</label>
      <input
        type="text"
        name="newTag"
        id="newTag"
        list="tags"
        onChange={(e) => setCurrentTag(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <datalist id="tags">
        <option>Pick a tag</option>
        {remainingTags.map((tag) => (
          <option key={tag.id} value={tag.name}>
            {tag.name}
          </option>
        ))}
        {/* <option value="">Create {newTag}</option> */}
      </datalist>
      <button onClick={handleSelectTag}>Submit selected tag</button>
      <label htmlFor="newTag">Don't see your tag? Create one!</label>
      <input
        type="text"
        name="newTag"
        id="newTag"
        onChange={(e) => setCurrentTag(e.target.value)}
      />
      <button onClick={handleSelectTag}>Add tag</button>
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
export const getServerSideProps: GetServerSideProps = async () => {
  const ingredients: Ingredient[] = await prisma.ingredient.findMany({});
  const tags: Tag[] = await prisma.tag.findMany({});
  console.log(ingredients);

  return {
    props: {
      data: ingredients,
      tags: tags,
    },
  };
};
export default AddRecipe;
