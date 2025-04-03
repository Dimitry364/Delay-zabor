import React, { useContext } from 'react';
import Card from '../Card/Card';
import { CardsContext } from '../Context/CardsContext';
import './CardList.css';

function CardList() {
  const { cards } = useContext(CardsContext);
  return (
    <section className='cards'>
      <h2 className='cards__fence'>Виды забора</h2>
      <ul className='cards__list'>
        {cards.map((cardsData) => (
          <Card key={cardsData._id} card={cardsData} />
        ))}
      </ul>
    </section>
  );
}

export default CardList;
