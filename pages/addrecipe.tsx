import React from "react";

function AddRecipe() {
  return (
    <div>
      <p>Add recipe</p>
      <form action="" method="post">
        <label htmlFor="">Name:</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="name"
        />
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Pick
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          className="textarea"
          placeholder="Bio"
          name="instructions"
        ></textarea>
      </form>
    </div>
  );
}

export default AddRecipe;
