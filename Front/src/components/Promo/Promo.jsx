import React, { useContext } from 'react';
import './Promo.css';
import consultation from '../../images/promo/Group-2.png';
import measuring from '../../images/promo/Group-3.png';
import brigade from '../../images/promo/Group.png';
import acceptance from '../../images/promo/Group-1.png';
import FenceLinks from '../FenceLinks/FenceLinks';
import { OrderPopupContext } from '../Context/OrderPopupContext';
import { CardsContext } from '../Context/CardsContext';
import PromoImage from '../../images/promo/shutterstock_2065336.png';

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
        <div className='promo__steps'>
          <h2 className='promo__steps-title'>Этапы работы</h2>
          <ul className='promo__steps-list'>
            <li className='promo__steps-item'>
              <img
                src={consultation}
                alt='Консультация'
                className='promo__steps-icon'
              />
              <strong className='promo__steps-strong'>Консультация</strong>
              <p className='promo__steps-paragraph'>
                Подберем решениепод ваши потребности, расскажем подробности,
                посчитаем итоговую стоимость.
              </p>
            </li>
            <li className='promo__steps-item'>
              <img src={measuring} alt='Замер' className='promo__steps-icon' />
              {/* <div className='promo__steps-text'> */}
              <strong className='promo__steps-strong'>Замер</strong>
              <p className='promo__steps-paragraph'>
                Произведем замеры, составим смету и оформим договор.
              </p>
              {/* </div> */}
            </li>
            <li className='promo__steps-item'>
              <img src={brigade} alt='Монтаж' className='promo__steps-icon' />
              <strong className='promo__steps-strong'>Монтаж</strong>
              <p className='promo__steps-paragraph'>
                Бригада профессионалов возведет забор вокруг участка в
                установленные сроки.
              </p>
            </li>
            <li className='promo__steps-item'>
              <img
                src={acceptance}
                alt='Прием работ'
                className='promo__steps-icon'
              />
              <strong className='promo__steps-strong'>Прием работ</strong>
              <p className='promo__steps-paragraph'>
                Производим финишные работы и уборку территории. Ваш забор готов!
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Promo;
