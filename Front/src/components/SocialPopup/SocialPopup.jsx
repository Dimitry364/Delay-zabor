import React, { useState } from 'react';
import './SocialPopup.css';
import telegram from '../../images/socialIcon/telegram.svg';
import whatsapp from '../../images/socialIcon/whatsapp.svg';
import messageIcon from '../../images/socialIcon/message.svg';
import closeIcon from '../../images/popup/CloseIcon.svg';

function SocialPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`social-popup ${isOpen ? 'social-popup_open' : ''}`}>
      <button
        className={`social-popup__toggle ${
          isOpen ? 'social-popup__toggle_rotate' : ''
        }`}
        onClick={togglePopup}
      >
        <img
          className='social-popup__icon'
          src={isOpen ? closeIcon : messageIcon}
          alt='Toggle Social Popup'
        />
      </button>

      <div className='social-popup__icons'>
        <a
          className='social-popup__link'
          href='https://wa.me/79130151462'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='social-popup__icon-img'
            src={whatsapp}
            alt='WhatsApp'
          />
        </a>
        <a
          className='social-popup__link'
          href='https://t.me/poedimsalo'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='social-popup__icon-img'
            src={telegram}
            alt='Telegram'
          />
        </a>
      </div>
    </div>
  );
}

export default SocialPopup;
