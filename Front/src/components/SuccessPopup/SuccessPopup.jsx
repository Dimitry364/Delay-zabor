import React, { useContext } from 'react';
import './SuccessPopup.css';
import { OrderPopupContext } from '../Context/OrderPopupContext';

function SuccessPopup() {
  const { isSuccessPopupOpen, closeSuccessPopup } =
    useContext(OrderPopupContext);

  if (!isSuccessPopupOpen) return null;

  return (
    <div className='success-popup'>
      <div className='success-popup__container'>
        <h2 className='success-popup__title'>Спасибо за заявку!</h2>
        <p className='success-popup__message'>
          Мы скоро свяжемся с вами для уточнения деталей.
        </p>
        <button className='success-popup__button' onClick={closeSuccessPopup}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;
