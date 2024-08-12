import React from 'react';

const SavedRecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="p-4 border rounded-md shadow-md cursor-pointer flex flex-col" onClick={onClick}>
      <div className="flex-grow flex items-center justify-center">
        <h3 className="text-l font-bold text-center">{recipe.recipeName}</h3>
      </div>
      <div className='mt-auto'></div>
      <img
        src={recipe.recipeImage}
        alt={recipe.recipeName}
        className="w-full h-40 object-cover rounded-md mt-4"
      />
    </div>
  );
};

export default SavedRecipeCard;