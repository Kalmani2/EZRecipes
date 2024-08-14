import React, { useEffect, useState } from 'react';
import Axios from 'axios';

// personal api key
const apiKey = process.env.REACT_APP_SPOONACULAR_KEY

const RecipePopup = ({ id, onClose, handleSaveRecipe }) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await Axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: { apiKey: apiKey },
          }
        );
        setRecipe(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const saveRecipe = () => {
    if (recipe) {
      handleSaveRecipe({
        recipeID: recipe.id,
        recipeName: recipe.title,
        recipeImage: recipe.image,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-full overflow-y-auto">
        {error && <div className="text-red-500">{error}</div>}
        {recipe ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className="w-full h-60 object-cover rounded-md mb-4"/>
            <h3 className="text-xl font-bold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside mb-4">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mb-2">Instructions</h3>
            <div className="mb-4">{recipe.instructions.replace(/(<([^>]+)>)/gi, '')}</div>
            <div className='flex justify-between'>
              <button onClick={onClose} className="mt-4 ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"> Close </button>
              <button onClick={saveRecipe} className="mt-4 mr-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"> Save Recipe </button>
            </div>
            
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

const RecipeGeneration = ({ ingredients, handleSaveRecipe }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (ingredients) {
      const fetchRecipes = async () => {
        try {
          const response = await Axios.get(
            'https://api.spoonacular.com/recipes/findByIngredients',
            {
              params: {
                ingredients: ingredients,
                number: 12,
                ignorePantry: true,
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
    <div className="mt-8 mb-4 p-4 border border-gray-300 rounded-md max-w-4xl mx-auto">
      {error && <div className="text-red-500">{error}</div>}
      <h2 className="text-center font-bold text-2xl mb-4">RECIPES</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {recipes.map((recipe) => {
          const result = Math.round(
            (recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount)) * 100);
          return (
            <div
              key={recipe.id}
              className="p-4 border rounded-md shadow-md cursor-pointer flex flex-col"
              onClick={() => setSelectedRecipe(recipe.id)}
            >
              <div className="flex-grow flex items-center justify-center">
                <h3 className="text-l font-bold text-center ">{recipe.title}</h3>
              </div>
              <div className='mt-auto'></div>
              <img
                src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-md mt-4"
              />
              <h3 className="text-center text-3xl mt-4 font-bold text-green-500">
                {result}%
              </h3>
            </div>
          );
        })}
      </div>
      {selectedRecipe && (
        <RecipePopup id={selectedRecipe} onClose={() => setSelectedRecipe(null)} handleSaveRecipe={handleSaveRecipe} />
      )}
    </div>
  );
};

export default RecipeGeneration;