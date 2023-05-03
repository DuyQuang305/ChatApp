import React, {useEffect, useState} from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import '../assets/css/base.css';
import '../assets/css/ChatInput.css';

export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow =  () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emoji) => {
        console.log(emoji.emoji);
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length > 0) {
            handleSendMsg(msg);
            setMsg('')
        }
    }

  return (
    <div className='chat-input__container'>
        <div className="chat-button__container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <Picker data={data} onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form className='chat-form' onSubmit={(e) => sendChat(e)}>
            <input type='text' placeholder='type your message here' 
                    value={msg} onChange = { e => setMsg(e.target.value)}/>
            <button className='btn-submit'>
                <IoMdSend />
            </button>
        </form>
    </div>
  )
}
