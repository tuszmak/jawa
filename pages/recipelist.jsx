import Link from "next/link";

// async function getData() {
//     let response = await fetch("http://localhost:3000/api/getRecipes")
//     return response.json();
//     console.log(response);
    
// }

export default async function recipeList() {
    // const data = await getData();
    
    return(
        <div>
            <button className="btn"><Link href='/'>Back to homepage</Link></button>
            <div>Recipes</div>
            {/* <div>{data}</div> */}
        </div>
    )
}