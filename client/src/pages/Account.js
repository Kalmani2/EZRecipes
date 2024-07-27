import React from 'react'
import { useNavigate } from "react-router-dom";

function Account({ user , setUser }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login')
    setUser(null);
  };

  return (
    <div className='flex justify-center h-screen'>
      <div className='flex flex-col items-center justify-between w-full max-w-4xl'>
        <div className='text-5xl font-bold mt-20'>{user.username}</div>

        <div className='flex-grow mt-10'>
          <h2 className='text-2xl font-bold mb-4'>Saved Recipes</h2>
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