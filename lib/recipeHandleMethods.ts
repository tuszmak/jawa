import { Ingredient } from "@/types/types";

export const moveIngredients = (
  ingredientName: string,
  currentIngredients: Ingredient[],
  remainingIngredients: Ingredient[],
) => {
  const newIngredients = structuredClone(currentIngredients);
  const newRemIngredients = structuredClone(remainingIngredients);

  const ingredientInTheData = newRemIngredients.find(
    (e: Ingredient) => e.name === ingredientName,
  );
  if (ingredientInTheData) {
    newRemIngredients.splice(newRemIngredients.indexOf(ingredientInTheData), 1);
    newIngredients.push(ingredientInTheData);
  }
  return [newIngredients, newRemIngredients];
};
