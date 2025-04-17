import React, { useContext } from 'react';
import './Promo.css';
import FenceLinks from '../FenceLinks/FenceLinks';
import { OrderPopupContext } from '../Context/OrderPopupContext';
import { CardsContext } from '../Context/CardsContext';
import PromoImage from '../../images/promo/promofence.webp';
import PromoSteps from '../PromoStepCard/PromoSteps';

function Promo() {
  const { openOrderPopup } = useContext(OrderPopupContext);
  const { cards } = useContext(CardsContext);

  console.log('openOrderPopup:', openOrderPopup);
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__content'>
          <div className='promo__info'>
            <div className='promo__title-wrapper'>
              <h1 className='promo__title'>
                Изготовление
                <br /> заборов под ключ
              </h1>
              <div className='promo__query'>
                <h2 className='promo__subtitle'>
                  В&nbsp;Новосибирске
                  <br />
                  и&nbsp;Новосибирской&nbsp;области
                </h2>
                <button
                  className='promo__button-query'
                  onClick={openOrderPopup}
                >
                  Оставить заявку
                </button>
              </div>
            </div>
          </div>
          <div className='promo__list-container'>
            <ul className='promo__list'>
              <FenceLinks
                cards={cards}
                linkClassName='promo__link'
                ListClassName='promo__list-item'
              />
            </ul>
          </div>
        </div>
        <div className='promo__image' title='Изображение забора'>
          <img
            src={PromoImage}
            alt='Фото забора'
            className='promo__image-item'
          />
        </div>

        {/* Новый блок "Этапы работы" */}
        <PromoSteps />
      </div>
    </section>
  );
}

export default Promo;
