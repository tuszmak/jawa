import { Recipe } from "@/types/types";
import React from "react";
import stuff from "../images/homepageImage.png";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import DeleteRecipe from "./recipeList/DeleteRecipe";

interface CardProps {
  recipe: Recipe;
}
function Card({ recipe }: CardProps) {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl mt-6 lg:m-6 block">
        <div className="flex justify-center">
          <div className="relative w-64 h-64 ">
            <Image src={stuff} alt="Shoes" fill />
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">{recipe.name}</h2>
          <div className="card-actions justify-between items-baseline">
            <p>{recipe.ingredient_id_list?.length || "No"} ingredients</p>
            <p>{recipe.tag_list?.length || "No"} tags</p>
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <RxHamburgerMenu />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={`recipe/${recipe.id}`}>Details</Link>
                </li>
                <li>
                  <Link href={`modifyRecipe/${recipe.id}`}>Modify</Link>
                </li>
                <li>
                  <DeleteRecipe id={recipe.id} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
