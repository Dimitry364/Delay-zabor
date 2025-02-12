import React from 'react';
import CardApi from '../utils/CardsApi';
import CardList from '../CardList/CardList';
import Promo from '../Promo/Promo';

function Main({ onOrderClick }) {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    CardApi.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log('Ошибка в получении карточки');
        console.error(err);
      });
  }, []);

  return (
    <main className='main'>
      <Promo />
      <CardList cards={cards} onOrderClick={onOrderClick} />
    </main>
  );
}

export default Main;
