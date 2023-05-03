import React, { useEffect, useState, useRef } from 'react';
import '../assets/css/base.css';
import '../assets/css/Chat.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';  

function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
      const getCurrentUser = async () => {
          if (!localStorage.getItem('chat-app-user')) {
                navigate('/login')
          } else {
                const user = await JSON.parse(localStorage.getItem('chat-app-user'))
                setCurrentUser(user);
                setIsLoaded(true);
          }
      }
    
      getCurrentUser();
    }, []);

    useEffect(() => {
      if(currentUser) {
            socket.current = io('http://localhost:8000');
            socket.current.emit('add-user', currentUser._id);
      }
    }, [currentUser])

    useEffect(() => {
      const getContacts = async () => {
          if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                       const id = currentUser._id
                       const data = await axios.get(`http://localhost:8000/api/users/${id}`)
                       setContacts(data.data)
                } else {
                       navigate('/setAvatar')
                }
           } 
      }
    
      getContacts();
    }, [currentUser]); 

    const handleChatChange = (chat) => {
            setCurrentChat(chat)
    }

  return (
    <>
        <div className='wrap__chat'>
            <div className="container__chat">
                  <Contacts contacts={contacts} 
                              currentUser={currentUser} 
                              changeChat={handleChatChange}
                  />
                  {
                         isLoaded && currentChat === undefined ? (
                         <Welcome currentUser={currentUser} />
                        ) : (
                          <ChatContainer currentChat={currentChat} 
                                         currentUser={currentUser} 
                                         socket={socket}/>
                        )
                  }
                  
            </div>
        </div>
    </>
    
  )
}

export default Chat;
