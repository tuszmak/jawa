import Link from "next/link";
import React from "react";
import { BiSolidPlusCircle } from "react-icons/bi";

function AddRecipeButton() {
  return (
    <div className="tooltip tooltip-left" data-tip="Add new recipe">
      <Link href="/addrecipe">
        <BiSolidPlusCircle size="64px" />
      </Link>
    </div>
  );
}

export default AddRecipeButton;
