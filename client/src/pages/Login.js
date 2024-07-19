import React from 'react'
import SideBar from '../components/SideBar'

function Login() {
  return (
    <div>
      <div className='flex'>
            <div className='w-60'>
                <SideBar />
            </div>
            <div className='flex-col flex-grow'>
              {/* <h1 className='text-5xl font-bold text-center mt-20 mb-16'>Login</h1> */}
              <div className="min-h-screen flex items-center justify-center">
                <div className="bg-green-400 p-8 rounded-lg shadow-lg w-full max-w-md">
                  <h2 className="text-2xl font-bold mb-6 text-center">LOGIN</h2>
                  <form>
                    <div className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 focus:outline-none "
                      />
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 focus:outline-none "
                      />
                    </div>
                    
                    <div className="mb-6">
                      <div>
                        <label className="inline-flex items-center mr-6">
                          <input
                            type="radio"
                            className="form-radio text-blue-600"
                            name="option"
                            value="login"
                          />
                          <span className="ml-1.5 text-gray-800">Login</span>
                        </label>
                        <label className="inline-flex items-center ">
                          <input
                            type="radio"
                            className="form-radio text-blue-600"
                            name="option"
                            value="sign-up"
                          />
                          <span className="ml-1.5 text-gray-800">Sign Up</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <button
                        // type="submit"
                        className="shadow bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login
