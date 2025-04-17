import React from 'react';
import './PromoSteps.css';
import consultation from '../../images/promo/sstep-img (1).png';
import measuring from '../../images/promo/sstep-img (2).png';
import brigade from '../../images/promo/sstep-img (3).png';
import acceptance from '../../images/promo/sstep-img (4).png';

function PromoSteps() {
  return (
    <div className='promo__steps'>
      <h2 className='promo__steps-title'>Этапы работы</h2>
      <ul className='promo__steps-list'>
        <li className='promo__steps-item'>
          <img
            src={consultation}
            alt='Консультация по установке забора'
            className='promo__steps-icon'
          />
          <strong className='promo__steps-strong'>Консультация</strong>
          <p className='promo__steps-paragraph'>
            Подберем решение под ваши потребности, расскажем подробности,
            посчитаем итоговую стоимость.
          </p>
        </li>
        <li className='promo__steps-item'>
          <img src={measuring} alt='Замер' className='promo__steps-icon' />
          <strong className='promo__steps-strong'>Замер</strong>
          <p className='promo__steps-paragraph'>
            Произведем замеры, составим смету и оформим договор.
          </p>
        </li>
        <li className='promo__steps-item'>
          <img src={brigade} alt='Монтаж' className='promo__steps-icon' />
          <strong className='promo__steps-strong'>Монтаж</strong>
          <p className='promo__steps-paragraph'>
            Бригада профессионалов возведет забор вокруг участка в установленные
            сроки.
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
  );
}

export default PromoSteps;
