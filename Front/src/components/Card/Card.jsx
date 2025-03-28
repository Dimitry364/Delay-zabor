import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ card }) {
  const cardUrl = `/card/${card.id}`;

  return (
    <li className='card'>
      {/* Обёртка для клика по изображению и информации */}
      <Link
        className='card__link'
        to={cardUrl}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img className='card__image' src={card.image} alt={card.name} />
        <div className='card__info'>
          <h3 className='card__name'>{card.name}</h3>
          <p className='card__price'>
            Цена монтажа: <br />
            <span className='card__price-span'>{card.installation_price}</span>
          </p>
          <p className='card__price'>
            Цена под ключ: <br />
            <span className='card__price-span'>{card.turnkey_price}</span>
          </p>
        </div>
      </Link>
      {/* Отдельная кнопка-ссылка, ведущая на тот же URL */}
      <Link className='card__button_link' to={cardUrl}>
        Подробнее
      </Link>
    </li>
  );
}

export default Card;
