import { Ingredient, Recipe } from "@/types/types";
import React, { ChangeEvent } from "react";
import Select from "react-select";

interface Props {
  remainingIngredients: Ingredient[];
  handleNewIngredient: (ingredientName: string) => void;
}
function RecipeIngredientPicker({
  remainingIngredients,
  handleNewIngredient,
}: Props) {
  return (
    <div>
      <div>
        <p>Select ingredient: </p>
        <Select
          id="tagSelect"
          options={remainingIngredients}
          getOptionLabel={(ingredient: Ingredient) => ingredient.name}
          getOptionValue={(ingredient: Ingredient) => ingredient.name}
          onChange={(e) => handleNewIngredient(e?.name || "")}
        />
      </div>
    </div>
  );
}

export default RecipeIngredientPicker;
