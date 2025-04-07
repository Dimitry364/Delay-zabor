import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header/logoDark.svg';
import FenceLinks from '../FenceLinks/FenceLinks';
import { CardsContext } from '../Context/CardsContext';
import './Footer.css';

function Footer() {
  const { cards } = useContext(CardsContext);

  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__column'>
          <Link to='/' className='footer__logo-link'>
            <img className='footer__logo' src={logo} alt='Логотип ДелайЗабор' />
            <h2 className='footer__company-name'>ДЕЛАЙЗАБОР</h2>
          </Link>
          <p className='footer__copyright'>
            © 2023 ДелайЗабор. Все права защищены
          </p>
        </div>

        <div className='footer__column'>
          <h3 className='footer__title'>Виды забора</h3>
          <ul className='footer__list'>
            <FenceLinks cards={cards} linkClassName='footer__link' />
          </ul>
        </div>

        <div className='footer__column'>
          <ul className='footer__list'>
            <li>
              <Link to='/gallery' className='footer__link footer__link_about'>
                Наши работы
              </Link>
            </li>
            <li>
              <Link
                to='/about-details'
                className='footer__link footer__link_about'
              >
                О нас
              </Link>
            </li>
            <li>
              <Link to='/contacts' className='footer__link footer__link_about'>
                Контакты
              </Link>
            </li>
            <li>
              <Link to='/reviews' className='footer__link footer__link_about'>
                Отзывы
              </Link>
            </li>
            <li>
              <Link
                to='/privacy'
                className='footer__link footer__link_about footer__link_policy'
              >
                Политика конфиденциальности
              </Link>
            </li>
          </ul>
        </div>

        <div className='footer__column'>
          <ul className='footer__list'>
            <li>
              <a
                href='tel:+73832279303'
                className='footer__link footer__link_about'
              >
                +7 (383) 227 93 03
              </a>
            </li>
            <li>
              <a
                href='tel:+79232279303'
                className='footer__link footer__link_about'
              >
                +7 (923) 227 93 03
              </a>
            </li>
            <li>
              <a
                href='mailto:zabor2279303@mail.ru'
                className='footer__link footer__link_about'
              >
                zabor2279303@mail.ru
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
