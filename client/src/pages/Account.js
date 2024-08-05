import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import SavedRecipeCard from '../components/SavedRecipes';

function Account({ user , setUser }) {
  const [savedRecipes, setSavedRecipes] = React.useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login')
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      Axios.get(`http://localhost:5000/savedRecipes/${user.username}`)
        .then((response) => {
          setSavedRecipes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching saved recipes', error);
        });
    }
  }, [user]);

  return (
    <div className='flex justify-center h-screen'>
      <div className='flex flex-col items-center justify-between w-full max-w-4xl'>
        <div className='text-5xl font-bold mt-20'>{user.username}</div>

        <div className='flex-grow mt-10'>
          <h2 className='text-2xl font-bold mb-4'>Saved Recipes</h2>
        </div>
        {/* user's saved recipe cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {savedRecipes.map((recipe, index) => (
            <SavedRecipeCard key={index} recipe={recipe} />
          ))}
        </div>
        <div onClick={handleLogout} className='cursor-pointer bg-red-500 hover:bg-red-600
                                            text-white font-bold py-2 px-4 rounded mb-10 
                                            text-center shadow-md'>
          Log Out
        </div>
      </div>  
    </div>

  )
}

export default Account