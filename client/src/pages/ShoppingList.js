import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const IngredientInput = ({ nameList, handleAddIngredient, handleRemoveIngredient, handleAddToPantry }) => {
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
            className="border-2 border-gray-300 rounded-md p-2 mr-2 focus:outline-none"
            placeholder="Enter names"
            value={name}
            onChange={handleChange}
          />
        </form>
        <button className="py-2.5 px-3.5 bg-green-400 hover:bg-green-500 focus:outline-none rounded-md font-bold" onClick={handleSubmit}>
          Enter
        </button>
      </div>
      <div className="flex flex-col mt-8 p-2 border border-gray-300 rounded-md flex-wrap max-w-xl min-h-16 overflow-y-auto mx-auto">
        {nameList.map((name, index) => (
          <div 
            key={index} 
            className="flex flex-row justify-between items-center p-2 m-1 h-10 border border-gray-200 rounded-md "
          >
            {/* ingredient name */}
            <div className='flex'>
              {name}
            </div>
            {/* ingredient buttons */}
            <div className='flex flex-row m-1'>
              {/* remove from shopping list and add to pantry */}
              <h1 className='flex items-center justify-center p-1 h-7 w-7 cursor-pointer
                              border border-gray-200 rounded-md mr-2 bg-green-400 hover:bg-green-500'
                              onClick={() => handleAddToPantry(name)}> + </h1>
              {/* remove from shopping list */}
              <h1 className='flex items-center justify-center p-1 h-7 w-7 cursor-pointer
                              border border-gray-200 rounded-md bg-red-400 hover:bg-red-500'
                              onClick={() => handleRemoveIngredient(name)}> - </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function ShoppingList({ user }) {

  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    if (user) {
      Axios.get(`http://localhost:5000/shoppingList/${user.username}`)
        .then(response => {
          setNameList(response.data || []);
        })
        .catch(error => {
          console.error('Error fetching shopping list', error);
        });
    }
  }, [user]);

  // add ingredient to shopping list
  const handleAddIngredient = (name) => {
    if (nameList.includes(name)) {
      return;
    }
    
    if (user) {
      Axios.post(`http://localhost:5000/shoppingList/${user.username}`, { ingredient: name })
        .then(response => {
          setNameList(response.data);
        })
        .catch(error => {
          console.error('Error adding ingredient to shopping list', error);
        });
    } else {
      const updatedNameList = [...nameList, name];
      setNameList(updatedNameList);
    }
  };

  // remove ingredient from shopping list
  const handleRemoveIngredient = (name) => {
    if (user) {
      Axios.delete(`http://localhost:5000/shoppingList/${user.username}`, { data: { ingredient: name } })
        .then(response => {
          setNameList(response.data);
        })
        .catch(error => {
          console.error('Error removing ingredient from shopping list', error);
        });
    } else {
      const newList = nameList.filter(item => item !== name);
      setNameList(newList);
    }
  };

  // move ingredient from shopping list to pantry
  const handleAddToPantry = (name) => {
    if (user) {
      Axios.post(`http://localhost:5000/pantry/${user.username}`, { ingredient: name })
        .then(response => {
          setNameList(response.data.shoppingList);
        })
        .catch(error => {
          console.error('Error moving ingredient to pantry', error);
        });
    } else {
      const newList = nameList.filter(item => item !== name);
      setNameList(newList);
    }
  };

  return (
    <div>
      <div className="flex-col flex-grow">
        <h1 className='text-5xl font-bold text-center mt-20 mb-16'>SHOPPING LIST</h1>
        <IngredientInput 
          nameList={nameList} 
          handleAddIngredient={handleAddIngredient} 
          handleRemoveIngredient={handleRemoveIngredient} 
          handleAddToPantry={handleAddToPantry}
        />
      </div>
    </div>
  )
}

export default ShoppingList;
