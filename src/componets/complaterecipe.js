// import React, { useState, useEffect } from "react";
// import './complaterecipe.css';
// import { useParams } from "react-router-dom";


// const YOUR_APP_ID = "b3b300c4";
// const YOUR_APP_KEY = "5085223673a4997aa464bb69c5f5bdf8";

// function CompleteRecipe({ match }) {
//   const [recipe, setRecipe] = useState(null);
//   const recipeId = match.params.recipeId;

//   useEffect(() => {
//     fetchRecipeDetails();
//   }, [recipeId]);

//   const fetchRecipeDetails = async () => {
//     try {
//       const response = await fetch(
//         `https://api.edamam.com/search?r=${recipeId}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
//       );
//       const data = await response.json();
//       setRecipe(data[0]);
//     } catch (error) {
//       console.error("Error fetching recipe details:", error);
//     }
//   };

//   if (!recipe) {
//     return <p>Loading recipe details...</p>;
//   }

//   return (
//     <div className="recipe-container">
//       <div className="recipe-details">
//         <h2>{recipe.label}</h2>
//         <img src={recipe.image} alt={recipe.label} />
//         <p>{recipe.source}</p>
//         <ul>
//           {recipe.ingredients.map((ingredient, index) => (
//             <li key={index}>{ingredient.text}</li>
//           ))}
//         </ul>
//         <a href={recipe.url} target="_blank" rel="noopener noreferrer">
//           View Full Recipe
//         </a>
//       </div>
//     </div>
//   );
// }

// export default CompleteRecipe;

import React, { useState, useEffect } from "react";
import './complaterecipe.css';
import { useParams,useNavigate } from "react-router-dom";

const YOUR_APP_ID = "b3b300c4";
const YOUR_APP_KEY = "5085223673a4997aa464bb69c5f5bdf8";
function CompleteRecipe(props) {
  const [recipe, setRecipe] = useState(null);
  // const recipeId = params.recipeId;
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("b2ebad01df2a319d259c2d3f61eb40c5");
  useEffect(() => {
    fetchRecipeDetails();
    console.log('recipeIDddddddd=>',recipeId)
  }, [recipeId]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(
         `https://api.edamam.com/search?q=${recipeId}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      );
      const data = await response.json();
      if (data && data.hits && data.hits.length > 0) {
        setRecipe(data.hits[0].recipe); // Access the first recipe object from the response array
      } else {
        setRecipe(null);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      setRecipe(null);
    }
  };

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }
  const handleback= () => {
    navigate('/')
  }

  return (
    <div className="recipe-container">
      <div className="recipe-details">
      <h2>{recipe.label}</h2>
        <img src={recipe.image} alt={recipe.label} />
        <p>{recipe.source}</p>
        <ul>
            {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
        <button onClick={() => handleback()}>
            Back
         </button>
      </div>
    </div>
  );
}
export default CompleteRecipe;
