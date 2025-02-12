import React from 'react';
import Card from '../Card/Card';
import './CardList.css';

function CardList({ cards, onOrderClick }) {
  return (
    <section className='cards'>
      <h2 className='cards__fence'>Виды забора</h2>
      <ul className='cards__list'>
        {cards.map((cardsData) => (
          <Card
            key={cardsData.id}
            card={cardsData}
            onOrderClick={onOrderClick}
          />
        ))}
      </ul>
    </section>
  );
}

export default CardList;
