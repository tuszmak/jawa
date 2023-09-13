import React, { Dispatch, SetStateAction } from "react";

interface Props {
  recipeName: string;
  setRecipeName: Dispatch<SetStateAction<string>>;
}
function TextInput({ recipeName, setRecipeName }: Props) {
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full  max-w-xs"
        onChange={(e) => setRecipeName(e.target.value)}
        value={recipeName}
        name="name"
      />
    </div>
  );
}

export default TextInput;
