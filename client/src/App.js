import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import GenerateRecipe from './pages/GenerateRecipe';
import ShoppingList from './pages/ShoppingList';
import Information from './pages/Information';
import Login from './pages/Login';
import Account from './pages/Account';
import SideBar from './components/SideBar';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App flex">
      <div className="w-60 fixed">
        <SideBar user={user} />
      </div>
      <div className="flex-grow ml-60">
        <Routes>
          <Route path="/" element={<GenerateRecipe />} />
          <Route path='/shoppingList' element={<ShoppingList />} />
          <Route path='/information' element={<Information />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
