import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import RecipeGeneration from '../components/RecipeGeneration';

const IngredientInput = ({ nameList, handleAddIngredient, handleRemoveIngredient }) => {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      handleAddIngredient(name);
      setName('');
    }
  };

  return (
    <div className=''>
      <div className='flex flex-row justify-center'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 mr-2"
            placeholder="Enter names"
            value={name}
            onChange={handleChange}
          />
        </form>
        <button className="py-2.5 px-3.5 bg-green-500 hover:bg-green-600 focus:outline-none rounded-md font-bold" onClick={handleSubmit}>
          Enter
        </button>
      </div>
      {/* <h1 className='text-2xl text-center mt-5'> Pantry </h1> */}
      <div className="mt-4 p-2 border border-gray-300 rounded-md flex flex-wrap max-w-2xl min-h-16 overflow-y-auto mx-auto">
        {nameList.length === 0 ? (
          <div className="flex items-center justify-center text-gray-400 text-center w-full h-full">PANTRY</div>
        ) : (
          nameList.map((name, index) => (
            <div 
              key={index} 
              className="items-center p-2 m-1 h-10 border border-gray-200 rounded-md flex-none cursor-pointer hover:bg-red-400 transition-opacity duration-300"
              onClick={() => handleRemoveIngredient(index)}
            >
              {name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function GenerateRecipe() {
  const [nameList, setNameList] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [showRecipeGeneration, setShowRecipeGeneration] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState('');

  const handleAddIngredient = (name) => {
    const updatedNameList = [...nameList, name];
    setNameList(updatedNameList);
    setIngredients(updatedNameList.join(','));
  };

  const handleRemoveIngredient = (index) => {
    const newList = [...nameList];
    newList.splice(index, 1);
    setNameList(newList);
    setIngredients(newList.join(','));
  };

  const handleGenerateRecipes = () => {
    setRecipeIngredients(ingredients);
    setShowRecipeGeneration(true);
  };

  return (
    <div>
      <div className="flex flex-col flex-grow">
        <h1 className='text-5xl font-bold text-center mt-20 mb-16'>RECIPE GENERATOR</h1>
        <IngredientInput 
          nameList={nameList} 
          handleAddIngredient={handleAddIngredient} 
          handleRemoveIngredient={handleRemoveIngredient} 
        />
        <div className='flex justify-center'>
          <button className="py-4 px-5 bg-green-500 hover:bg-green-600  rounded-md font-bold mt-5"
                              onClick={handleGenerateRecipes}>
              Generate Recipes
            </button >
          </div>
        {showRecipeGeneration && <RecipeGeneration ingredients={recipeIngredients} />}
      </div>
    </div>
  );
}

export default GenerateRecipe;