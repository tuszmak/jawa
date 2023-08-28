import React from "react";

export const IngredientSelect = () => {
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
    </div>
  );
};
