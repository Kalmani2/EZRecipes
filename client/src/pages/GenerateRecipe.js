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
    <div className='text-center'>
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
        <button className="py-2.5 px-3.5 bg-green-600 hover:bg-green-700 focus:outline-none rounded-md font-bold" onClick={handleSubmit}>
          Enter
        </button>
      </div>
      <h1 className='text-1xl text-center mt-5'> Pantry </h1>
      <div className="mt-2 p-2 border border-gray-300 rounded-md flex flex-wrap max-w-2xl min-h-36 overflow-y-auto mx-auto">
        {nameList.map((name, index) => (
          <div 
            key={index} 
            className="p-2 m-1 h-10 border border-gray-200 rounded-md flex-none cursor-pointer hover:bg-red-400 transition-opacity duration-300"
            onClick={() => handleRemoveIngredient(index)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

function GenerateRecipe() {
  const [nameList, setNameList] = useState([]);
  const [ingredients, setIngredients] = useState('');

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

  return (
    <div>
      <div className="flex">
        <div className='w-52'>
          <SideBar />
        </div>
        <div className="flex-grow">
          <h1 className='text-3xl text-center mt-5 mb-5'>Recipe Generator</h1>
          <IngredientInput 
            nameList={nameList} 
            handleAddIngredient={handleAddIngredient} 
            handleRemoveIngredient={handleRemoveIngredient} 
          />
          <button className="py-4 px-5 bg-green-600 hover:bg-green-700 focus:outline-none rounded-md font-bold mt-5">
            Generate Recipes
          </button >
          <RecipeGeneration ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}

export default GenerateRecipe;