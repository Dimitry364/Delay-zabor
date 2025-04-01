import React from 'react';
import CardList from '../CardList/CardList';
import Promo from '../Promo/Promo';
import OrderForm from '../OrderForm/OrderForm';
import OurWorks from '../OurWorks/OurWorks';

import About from '../About/About';
// import ReviewsSlider from '../ReviewsSlider/ReviewsSlider';

function Main() {
  return (
    <main className='main'>
      <Promo />
      <CardList />
      <OrderForm
        title={
          <>
            Закажи установку забора сейчас и{' '}
            <span className='order-form__title--highlight'>
              получи скидку 5%
            </span>
          </>
        }
      />
      <OurWorks />
      <About />
      {/* <ReviewsSlider /> */}
      <OrderForm title='Остались вопросы?' />
    </main>
  );
}

export default Main;
