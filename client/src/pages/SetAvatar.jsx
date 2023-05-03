import React, { useEffect, useState } from 'react';
import '../assets/css/base.css';
import '../assets/css/SetAvatar.css';
import loader from '../assets/img/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import avt1 from '../assets/img/avt1.png'
import avt2 from '../assets/img/avt2.png'
import avt3 from '../assets/img/avt3.png'
import avt4 from '../assets/img/avt4.png'

function SetAvatar() {
  const navigate = useNavigate();
  const avatars = [avt1, avt2, avt3, avt4];
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login')
    }
  }, []);

  const handleSaveAvatar = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar');
    } else {
      const user = JSON.parse(localStorage.getItem('chat-app-user'));
      setIsLoading(true);
      try {
        const { data } = await axios.post(`http://localhost:8000/api/auth/setAvatar/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        console.log(data.isSet);
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('chat-app-user', JSON.stringify(user))
          navigate('/');
        } else {
          toast.error('Error setting avatar. Please try again')
        }
      } catch (error) {
        console.error(error);
        toast.error('Error setting avatar. Please try again')
      }
      setIsLoading(false);
    }
  }

  return (
    <div className='avt_container'>
      <div className='title-container'>
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className='avatars'>
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
            >
              <img
                className='avt_img'
                src={avatar}
                alt="avatar"
                onClick={() => {
                  if (selectedAvatar === index) {
                    setSelectedAvatar(undefined);
                  } else {
                    setSelectedAvatar(index);
                  }
                }}
              />
            </div>
          )
        })}
      </div>
      <div className='button-container'>
        <button
          className='save-button'
          onClick={handleSaveAvatar}
          disabled={isLoading}
        >
          {isLoading ? (
            <img src={loader} alt='loading' />
          ) : (
            'SET AS PROFILE PICTURE'
          )}
        </button>
      </div>
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

export default SetAvatar;
