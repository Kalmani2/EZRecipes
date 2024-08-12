import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import SavedRecipeCard from '../components/SavedRecipes';

// personal api key
const apiKey = '7786ae26ef1c4d6da09cf12652c9bee6';

const RecipePopup = ({ id, onClose, handleRemoveRecipe }) => {
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

  const removeRecipe = () => {
    handleRemoveRecipe(id);
    onClose();
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
              <button onClick={removeRecipe} className="mt-4 mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"> Remove Recipe </button>
            </div>
            
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

function Account({ user , setUser }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login')
    setUser(null);
  };

  if (user) {
    var username1 = user.username;
  } else {
    username1 = 'Guest';
  }

  useEffect(() => {
    if (!user || !user.username) {
      navigate('/');
    } else {
      Axios.get(`http://localhost:5000/savedRecipes/${user.username}`)
        .then((response) => {
          setSavedRecipes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching saved recipes', error);
        });
    }
  }, [user, navigate]);

  const handleRemoveRecipe = (recipeID) => {
    Axios.delete(`http://localhost:5000/savedRecipes/${user.username}/${recipeID}`)
      .then((response) => {
        setSavedRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error removing recipe', error);
      });
  };

  return (
    <div className='flex justify-center min-h-screen bg-gray-100'>
      <div className='flex flex-col items-center w-full max-w-4xl p-6'>
        <div className='text-5xl font-bold mt-12'>{username1}</div>
        <hr className='w-full border-t-2 border-gray-300 mt-8' />
        <div className='w-full mb-4'>
          <h2 className='text-2xl font-bold mt-6 mb-6 text-center'>SAVED RECIPES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedRecipes.map((recipe, index) => (
              <SavedRecipeCard key={index} recipe={recipe} onClick={() => setSelectedRecipe(recipe.recipeID)}/>
            ))}
          </div>
        </div>
        
        <div onClick={handleLogout} className='mt-auto cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md'>
          Log Out
        </div>
      </div>
      {selectedRecipe && (
        <RecipePopup id={selectedRecipe} onClose={() => setSelectedRecipe(null)} handleRemoveRecipe={handleRemoveRecipe} />
      )}
    </div>

  )
}

export default Account