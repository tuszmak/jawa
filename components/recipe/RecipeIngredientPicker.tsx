import { Ingredient, Recipe } from "@/types/types";
import React, { ChangeEvent } from "react";

interface Props {
  remainingIngredients: Ingredient[];
  handleNewIngredient: (event: ChangeEvent<HTMLSelectElement>) => void;
}
function RecipeIngredientPicker({
  remainingIngredients,
  handleNewIngredient,
}: Props) {
  return (
    <div>
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
    </div>
  );
}

export default RecipeIngredientPicker;
