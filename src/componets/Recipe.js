import React from "react";
import './Recipe.css';
import './signup.css';

function Recipe({key, title, image, calories, ingredients }) {
  console.log('key====>',title)
  return (
    <div className="recipe-card">
      <div className="recipe-content">
        <img src={image} alt=""></img>
        <h1>{title}</h1>
          <div className="ingredients">
          <h2>Ingredients</h2>
          <ol>
            {ingredients.map((ingredient) => (
              <li>{ingredient.text}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
export default Recipe;
