import React, { useEffect, useState } from 'react';
import '../assets/css/base.css'
import '../assets/css/Authentication.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/svg/Logo.svg'

 function Login() {

    const navigate = useNavigate();
    
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleUserNameChange = (event) => {
            setUserName(event.target.value);
      };
    
      const handlePassWordChange = (event) => {
            setPassword(event.target.value);
      };

      useEffect( () => {
            if (localStorage.getItem('chat-app-user')) {
                  navigate('/')
            }
      })
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const {data} = await axios.post('http://localhost:8000/api/auth/login', {
                  username,   
                  password,
            });

            if (data.status === false) {
                  toast.error(data.msg)
            } else if (data.status === true) {
                  localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                  localStorage.setItem('chat-app-token', JSON.stringify(data.token));
                  navigate("/")
            }
           
        }
      };

      const handleValidation = () => {
            if (username === '' || password === '') {
                  toast.error('username or password must be required');
                  return false;
            } 
            return true;
      }

  return (
      <div className="wrap-auth">
            <div className='container-auth__login'>
                <div className='title'>
                  <h2>Login</h2>
                  <img src={Logo} alt="logo" className="logo" />
                </div>
                <form className='auth-form' onSubmit={handleSubmit}>
                  <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={handleUserNameChange}
                  />
                  <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePassWordChange}
                  />
                  <button className='btn_submit' type="submit">LOGIN</button>
                  <span className='text'>
                        <span>Don't have an Account?</span>
                        <Link to="/register">Register</Link>
                  </span>
              </form>
              <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                  />
            </div>
      </div>
  )
}

export default Login;      

