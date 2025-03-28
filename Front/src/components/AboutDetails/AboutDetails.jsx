import React from 'react';
import AboutList from '../AboutList/AboutList';
import OurWorks from '../OurWorks/OurWorks';
import CardApi from '../utils/CardsApi';
import OrderForm from '../OrderForm/OrderForm';
import './AboutDetails.css';

function AboutDetails() {
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
    <section className='about-details'>
      <div className='about-details__container'>
        <AboutList />
      </div>
      <OurWorks cards={cards} />
      <OrderForm title={'Остались вопросы?'} />
    </section>
  );
}

export default AboutDetails;
