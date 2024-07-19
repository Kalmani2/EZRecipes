import React from 'react';
import { useNavigate } from "react-router-dom";
import { IoIosCog, IoMdCart, IoIosInformationCircle, IoMdPerson,  IoIosNutrition} from 'react-icons/io';
import '../App.css';

const SideBar = () => {


    // sidebar page navigation
    const navigate = useNavigate();

    const navigateRecipeGenerator = () => {
        navigate('/')
    }
    const navigateShoppingList = () => {
        navigate('/shoppingList')
    }
    const navigateInformation = () => {
        navigate('/information')
    }
    const navigateLogin = () => {
        navigate('/login')
    }


  return (
    // Sidebar outline
    <div className="fixed top-0 left-0 h-screen w-60 m-0
                    flex flex-col justify-between
                    bg-green-400 text-white shadow-lg">
        <div className='flex flex-col items-center'>
            <h1 className="text-center mt-8 mb-2 font-bold text-3xl">EZ RECIPES</h1>
            <IoIosNutrition size={60} className="justify-center" />
        </div>
        <div className="flex flex-col justify-between -mt-10">
            <button className="py-3 px-4 mx-4 mb-6 rounded font-bold shadow-lg
                             bg-green-600 hover:bg-green-700 focus:outline-none "
                               onClick={navigateRecipeGenerator}>
                <IoIosCog className="inline mr-2" />RECIPE GENERATOR
            </button>
            <button className="py-3 px-4 mx-4 mt-6 mb-6 rounded font-bold shadow-lg
                             bg-green-600 hover:bg-green-700 focus:outline-none icon-text"
                               onClick={navigateShoppingList}>
                <IoMdCart className="inline mr-2" />SHOPPING LIST
            </button>
            <button className="py-3 px-4 mx-4 mt-6 rounded font-bold shadow-lg
                             bg-green-600 hover:bg-green-700 focus:outline-none icon-text"
                               onClick={navigateInformation}>
                <IoIosInformationCircle className="inline mr-2" />INFORMATION
            </button>
        </div>
        <div className="py-2 mx-8 rounded shadow-lg
                        text-center mb-8 mt-8 font-bold  
                        bg-green-600 hover:bg-green-700 cursor-pointer icon-text"
                        onClick={navigateLogin}>
            <IoMdPerson className="inline mr-2" />Login
        </div>
    </div>
  );
}

export default SideBar;