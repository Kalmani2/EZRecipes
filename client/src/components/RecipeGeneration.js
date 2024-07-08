import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeGeneration = ({ ingredients }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = '7786ae26ef1c4d6da09cf12652c9bee6';

  useEffect(() => {
    if (ingredients) {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients`,
            {
              params: {
                ingredients: ingredients,
                number: 12,
                apiKey: apiKey,
              },
            }
          );
          setRecipes(response.data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchRecipes();
    }
  }, [ingredients]);

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-md max-w-4xl mx-auto">
      {error && <div className="text-red-500">{error}</div>}
      <h2 className="text-center text-2xl mb-4">Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="p-4 border rounded-md shadow-md">
            <h3 className="text-xl font-bold">{recipe.title}</h3>
            <img
              src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-md mt-2"
            />
            <ul className="mt-2">
              {recipe.usedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
              {recipe.missedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeGeneration;