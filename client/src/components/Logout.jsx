import React from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import '../assets/css/base.css';
import '../assets/css/Logout.css';

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () =>  {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <button className="logout-button" onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
}