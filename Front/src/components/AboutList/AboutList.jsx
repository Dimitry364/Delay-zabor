import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { OrderPopupContext } from '../Context/OrderPopupContext';
import AboutImage1 from '../../images/about/aboutImage1.png';
import AboutImage2 from '../../images/about/aboutImage2.png';
import './AboutList.css';
import AboutSection from '../AboutSection/AboutSection';

function AboutList() {
  const { openOrderPopup } = useContext(OrderPopupContext);
  const { pathname } = useLocation();
  const isMain = pathname === '/';
  const Tag = isMain ? 'h2' : 'h1';

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    //TODO Вынести текст в отдельный компонент
    <div className='about-list'>
      {/* Основной блок (есть везде) */}
      <AboutSection
        title={<Tag className='about-section__title'>О нас</Tag>}
        textBlocks={[
          `Добро пожаловать на сайт компании, специализирующейся на монтаже и изготовлении заборов в Новосибирске.`,

          `Мы работаем с различными материалами, включая металлические заборы, заборы из профнастила, штакетника, профтрубы и поликарбоната.`,

          `Гарантируем высокое качество нашей работы и конкурентоспособную цену. Мы понимаем, что каждый клиент имеет свой бюджет, поэтому стараемся предоставить нашим клиентам дешевые, но качественные услуги.`,
        ]}
        image={AboutImage1}
        showButton={isMain}
        buttonComponent={
          <Link
            to='/about-details'
            className='about-section__button about-section__button_link'
          >
            Подробнее
          </Link>
        }
      />

      {/* Второй блок (только если НЕ главная страница) */}
      {!isMain && (
        <AboutSection
          textBlocks={[
            `Мы специализируемся на монтаже заборов любой сложности и формы. Наша команда опытных профессионалов использует только лучшие материалы и оборудование для обеспечения высокого качества работ.`,

            `Если вы ищете надежного партнера для монтажа или изготовления заборов в Новосибирске, обратитесь к нам. Мы гарантируем высокое качество работ, быстрое выполнение заказа и конкурентоспособную цену.`,

            `Свяжитесь с нами прямо сейчас и получите бесплатную консультацию по вашему проекту!`,
          ]}
          image={AboutImage2}
          isReversed={true}
          showButton={true}
          buttonComponent={
            <button className='about-section__button' onClick={openOrderPopup}>
              Оставить заявку
            </button>
          }
        />
      )}
    </div>
  );
}

export default AboutList;
