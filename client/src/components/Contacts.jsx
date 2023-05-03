import React, { useState, useEffect } from 'react';
import '../assets/css/base.css';
import '../assets/css/Contact.css';
import logo from '../assets/svg/Logo.svg';

function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact)
        // logic xử lý khi chọn contact
    };

    return (
        <>
            {currentUserImage && currentUserName && contacts && contacts.length > 0 && (
                <div className='contacts-container'>
                    <div className='contacts-container__brand'>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className="contacts-container__list">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    className={`contacts-container__item ${index === currentSelected ? 'contacts-container__item--selected' : ''}`}
                                    key={index}
                                    onClick={() => {
                                        if (index === currentSelected) {
                                            changeCurrentChat(-1, null);
                                        } else {
                                            changeCurrentChat(index, contact);
                                        }
                                    }
                                    }
                                >
                                    <div className="contacts-container__avatar">
                                        <img src={contact.avatarImage} alt="" />
                                    </div>
                                    <div className="contacts-container__info">
                                        <h3 className="contacts-container__name">{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="user_container">
                        <div className="user-container__avatar">
                            <img src={currentUser.avatarImage} alt="img" />
                        </div>
                        <div className="user-container__info">
                            <h3 className="user-container__name">{currentUser.username}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Contacts;