import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ card }) {
  return (
    <li className='card'>
      <Link className='card__link' to={`/card/${card.id}`}>
        <img className='card__image' src={card.image} alt={card.name} />

        <div className='card__info'>
          <h3 className='card__name'>{card.name}</h3>
          <p className='card__price'>
            Цена монтажа: <br /> {card.installation_price}
          </p>
          <p className='card__price'>
            Цена под ключ:
            <br /> {card.turnkey_price}
          </p>
        </div>
        <button className='card__button_order'>Подробнее</button>
      </Link>
    </li>
  );
}

export default Card;
