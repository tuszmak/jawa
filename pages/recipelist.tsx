import Link from "next/link";

export default function recipeList() {
    return(
        <div>
            <button className="btn"><Link href='/'>Back to homepage</Link></button>
            <div>Recipes</div>
        </div>
    )
}