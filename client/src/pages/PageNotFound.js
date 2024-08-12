import React from 'react';
import { useNavigate } from "react-router-dom";

function PageNotFound() {

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">PAGE NOT FOUND</p>
      <button className="mt-4 py-2.5 px-3.5 bg-green-400 hover:bg-green-500 focus:outline-none rounded-md font-bold" onClick={navigateHome}>
        Home
      </button>
    </div>
  );
}

export default PageNotFound;