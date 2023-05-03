import React from 'react'
import '../assets/css/base.css';
import '../assets/css/Welcome.css';
import Robot from '../assets/img/robot.gif'
export default function Welcom({ currentUser }) {
  return (
    <div className='welcome-container'>
        <img src={Robot} alt='robot' />
        <h1>Welcome, 
          <span>{currentUser.username}</span>
        </h1>
        <h3>Please select a chat to start Messaging.</h3>
    </div>
  )
}
