import React from 'react';
import './CardError.css';
import errorImg from '../../images/error/errorCard-2.png';

function CardError({ message = 'Что-то пошло не так', onRetry }) {
  return (
    <div className='card-error'>
      <img className='card-error__image' src={errorImg} alt='Ошибка' />
      <h2 className='card-error__title'>{message}</h2>
      {onRetry && (
        <button className='card-error__button' onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  );
}

export default CardError;
