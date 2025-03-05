import React from 'react';
import CardApi from '../utils/CardsApi';
import CardList from '../CardList/CardList';
import Promo from '../Promo/Promo';
import OrderForm from '../OrderForm/OrderForm';
import OurWorks from '../OurWorks/OurWorks';
import About from '../About/About';

function Main() {
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
      <CardList cards={cards} />
      <OrderForm
        title={
          <>
            Закажи установку забора
            <br />
            сейчас и{' '}
            <span className='order-form__title--highlight'>
              получи скидку 5%
            </span>
          </>
        }
      />
      <OurWorks cards={cards} />
      <About />
      <OrderForm title='Остались вопросы?' />
    </main>
  );
}

export default Main;
