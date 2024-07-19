import React from 'react'
import SideBar from '../components/SideBar';
import { IoLogoLinkedin , IoLogoGithub } from 'react-icons/io';

function Information() {

  const openGithub = () => {
    window.open('https://github.com/Kalmani2', '_blank');
  };

  // Function to open LinkedIn link
  const openLinkedin = () => {
    window.open('https://www.linkedin.com/in/muhammadkalmani/', '_blank');
  };

  return (
    <div>
        <div className='flex flex-row'>
            <div className='w-60'>
                <SideBar />
            </div>
            <div className='flex-col flex-grow'>
              <h1 className='text-5xl font-bold text-center mt-20 mb-16'>INFORMATION</h1>
              <p className='w-1/3 mx-auto text-justify'>EZRecipes was developed as a personal project by Muhammad Kalmani.
                                                        It uses React for the frontend and Express.js for the backend.
                                                        The recipe generation was created with the help of the Spoonacular API.</p>
              <div className='flex justify-center items-center mt-10'>
                <IoLogoGithub className='mr-4 cursor-pointer' size={'42px'} onClick={openGithub}/>
                <IoLogoLinkedin className='ml-4 cursor-pointer' size={'50px'} onClick={openLinkedin}/>
              </div>
            </div>
        </div>
      
    </div>
  )
}

export default Information
