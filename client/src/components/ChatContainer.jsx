import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../assets/css/base.css';
import '../assets/css/ChatContainer.css';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { v4 as uuidv4} from 'uuid';

export default function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef();
    useEffect(() => {
        const showAllMessage = async () => {
            if(currentChat) {
                const response = await axios.post(`http://localhost:8000/api/message/showMsg`, {
                    from: currentUser._id,
                    to: currentChat._id,
                })
                setMessages(response.data)
            }
        }

        showAllMessage()
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post('http://localhost:8000/api/message/addMsg', {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];

        msgs.push({ fromSelf: true, message: msg});
        setMessages(msgs);
    };

    useEffect( () => {
        if (socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({fromSelf: false, messages: msg});
            })
        }
    }, [socket])

    useEffect( () => {
        arrivalMessage && setMessages( (prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect( () => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages]);

    return (
        <>
            {
                currentChat && (
                    <div className='Chat-container'>
                        <div className="chat-header">
                            <div className="chat-header__user-detail">
                                <div className="user-detail__avatar">
                                    <img src={currentChat.avatarImage} alt="avt" />
                                </div>
                                <div className="user-detail__username">
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        <div className="chat-message">
                            {
                                messages.map((message, index) => {
                                    return (
                                        <div key={index} ref={scrollRef}>
                                            <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                                                <div className="content">
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div ref={scrollRef} />
                        </div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                )
            }
        </>

    )
}
