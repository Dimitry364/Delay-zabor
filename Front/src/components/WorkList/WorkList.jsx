import React from 'react';
import './WorkList.css';

function WorkList({ cards, popupOpen }) {
  return (
    <div className='work-list'>
      {cards.map((card) => (
        <div key={card.id} className='work-list__item'>
          <img
            className='work-list__image'
            onClick={() => popupOpen(card)}
            src={card.image}
            alt={card.name}
          ></img>
        </div>
      ))}
    </div>
  );
}

export default WorkList;
