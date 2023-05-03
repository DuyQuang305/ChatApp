import React, { useState } from 'react';
import '../assets/css/base.css'
import '../assets/css/Authentication.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';

 function Register() {
    const navigate = useNavigate();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUserNameChange = (event) => {
          setUserName(event.target.value);
      };
    
      const handleEmailChange = (event) => {
            setEmail(event.target.value);
      };
    
      const handlePassWordChange = (event) => {
            setPassword(event.target.value);
      };
    
      const handleConFirmPasswordChange = (event) => {
            setConfirmPassword(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const {data} = await axios.post('http://localhost:8000/api/auth/register', {
                  username,
                  email,
                  password,
            });

            if (data.status === false) {
                  toast.error(data.msg)
            } else if (data.status === true) {
                  localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                  navigate("/")
            }
        }
      };

      const handleValidation = () => {
            if (username === '' || email ==='' || password ==='' || confirmPassword === '') {
                  toast.error('Please fill in all required fields');
                  return false;
            }  else if (username.length < 6) {
                  toast.error('Username must be at least than 6 characters');
                  return false;
            } else if (!emailRegex.test(email)) {
                  toast.error('Please enter a valid email address');
                  return false;
            } else if (password.length < 6) {
                  toast.error('Password must be at least 6 characters');
                  return false;
            } else if (password.length > 18) {
                  toast.error('Password must be no more than 18 characters');
                  return false;
            } else if (password !== confirmPassword) {
                  toast.error('Password and Confirm Password must be same.');
                  return false;
            }
            return true;
      }

  return (
      <div className='container'>
          <div className='title'>Creative SignUp Form</div>
          <form className='auth-form' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUserNameChange}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassWordChange}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConFirmPasswordChange}
            />
            <button className='btn_submit' type="submit">Register</button>

            <span className='text'>
                  <span>Do you have an Account?</span>
                 <Link to="/login" >Login</Link>
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
  )
}

export default Register;      