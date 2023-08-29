import React from "react";

interface Props {
  instructions: string;
  setInstructions: (value: React.SetStateAction<string>) => void;
}
function RecipeInstructions({ instructions, setInstructions }: Props) {
  return (
    <div>
      <label htmlFor="instructions">Instructions:</label>
      <textarea
        className="textarea"
        placeholder="Bio"
        name="instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      ></textarea>
    </div>
  );
}

export default RecipeInstructions;
