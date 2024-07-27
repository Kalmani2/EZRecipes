import React, { useState } from 'react';
import Axios from 'axios';

function Login( { setUser } ) {
  const [option, setOption] = useState('login');
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = () => {
    Axios.post('http://localhost:5000/register', {
      username: usernameReg,
      password: passwordReg
    }).then((response) => {
      console.log(response);
      setErrorMessage('');
    }).catch((error) => {
      setErrorMessage(error.response ? error.response.data : 'Error registering user');
    });
  }

  const login = () => {
    Axios.post('http://localhost:5000/login', {
      username: usernameReg,
      password: passwordReg
    })
      .then((response) => {
        console.log(response);
        setUser({ username: response.data.username });
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.response ? error.response.data.error : 'Error logging in user');
      })
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent form from submitting and reloading the page

    if (option === 'login') {
      // when option is login
      console.log('Logging in...');
      login();
    } 
    else if (option === 'register') {
      // when option is register
      console.log('Registering...');
      register();
    }
  }

  return (
    <div>
      <div className='flex flex-col flex-grow'>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-green-400 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">LOGIN</h2>
            {/* registration error */}
            {errorMessage && (
              <div className="mb-4 py-2 text-white bg-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">

                {/* username input */}
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 focus:outline-none"
                  onChange={(e) => {
                    setUsernameReg(e.target.value)
                  }}
                />
              </div>
              
              {/* password input */}
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 focus:outline-none"
                  onChange={(e) => {
                    setPasswordReg(e.target.value)
                  }}
                />
              </div>
              
              <div className="mb-6">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="option"
                    value="login"
                    checked={option === 'login'}
                    onChange={() => setOption('login')}
                  />
                  <span className="ml-2">Login</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="option"
                    value="register"
                    checked={option === 'register'}
                    onChange={() => setOption('register')}
                  />
                  <span className="ml-2">Register</span>
                </label>
              </div>
              
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;