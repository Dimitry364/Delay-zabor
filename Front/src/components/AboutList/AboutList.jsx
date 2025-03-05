import React from 'react';
import { useLocation } from 'react-router-dom';
import AboutImage1 from '../../images/about/aboutImage1.png';
import AboutImage2 from '../../images/about/aboutImage2.png';
import './AboutList.css';

function AboutList() {
  const { pathname } = useLocation();
  const isMain = pathname === '/';

  return (
    <div className='about-list'>
      <h2 className='about-list__title'>О нас</h2>
      <p className='about-list__subtitle'>
        Добро пожаловать на&nbsp;сайт компании, специализирующейся
        на&nbsp;монтаже и&nbsp;изготовлении заборов в&nbsp;Новосибирске.
      </p>
      <p className='about-list__subtitle'>
        Мы&nbsp;работаем с&nbsp;различными материалами, включая металлические
        заборы, заборы из&nbsp;профнастила, штакетника, профтрубы
        и&nbsp;поликарбоната.
      </p>
      <p className='about-list__subtitle'>
        Гарантируем высокое качество нашей работы и&nbsp;конкурентоспособную
        цену. Мы&nbsp;понимаем, что каждый клиент имеет свой бюджет, поэтому
        мы&nbsp;стараемся предоставить нашим клиентам дешевые,
        но&nbsp;качественные услуги.
      </p>

      {/* Если не главная страница – выводим дополнительный контент */}
      {!isMain && (
        <>
          <img className='about-list__image' src={AboutImage1} alt='Работяга' />

          <p className='about-list__subtitle'>
            Мы&nbsp;специализируемся на&nbsp;монтаже заборов любой сложности
            и&nbsp;формы. Наша команда опытных профессионалов использует только
            лучшие материалы и&nbsp;оборудование для обеспечения высокого
            качества работ.
          </p>
          <p className='about-list__subtitle'>
            Если вы&nbsp;ищете надежного партнера для монтажа или изготовления
            заборов в&nbsp;Новосибирске, обратитесь к&nbsp;нам.
            Мы&nbsp;гарантируем высокое качество работ, быстрое выполнение
            заказа и&nbsp;конкурентоспособную цену. Свяжитесь с&nbsp;нами прямо
            сейчас и&nbsp;получите бесплатную консультацию по&nbsp;вашему
            проекту!
          </p>
          <img className='about-list__image' src={AboutImage2} alt='Работяга' />
        </>
      )}
    </div>
  );
}

export default AboutList;
