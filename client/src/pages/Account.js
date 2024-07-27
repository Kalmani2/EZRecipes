import React from 'react'

function Account() {
  return (
    <div>
      <div className='flex-col flex-grow'>
        <h1 className='text-5xl font-bold text-center mt-20 mb-16'>INFORMATION</h1>
        <p className='w-1/3 mx-auto text-justify'>EZRecipes was developed as a personal project by Muhammad Kalmani.
                                                  It uses React for the frontend and Express.js for the backend.
                                                  The recipe generation was created with the help of the Spoonacular API.</p>
      </div>  
    </div>
  )
}

export default Account