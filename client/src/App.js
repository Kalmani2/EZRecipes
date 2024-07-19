import React, { useState } from 'react'
import GenerateRecipe from './pages/GenerateRecipe.js'
import ShoppingList from './pages/ShoppingList.js'
import Information from './pages/Information.js'
import Login from './pages/Login.js'
import { Route, Routes } from 'react-router-dom'

function App() {

  const [backendData, setBackendData] = useState([{}])

  return (
    <div>
      <Routes>
        <Route path="/" element={<GenerateRecipe />} />
        <Route path='/shoppingList' element={<ShoppingList />} />
        <Route path='/information' element={<Information />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
