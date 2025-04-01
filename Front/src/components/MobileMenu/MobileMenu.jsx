import React from 'react';
import { Link } from 'react-router-dom';
import FenceLinks from '../FenceLinks/FenceLinks';
import logo from '../../images/header/logoDark.svg';
import phoneIcon from '../../images/header/phone-icon.svg';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, cards }) => {
  return (
    <div className={`mobile-menu ${isOpen ? 'mobile-menu_open' : ''}`}>
      {/* Шапка */}
      <div className='mobile-menu__header'>
        <Link to='/' className='mobile-menu__logo' onClick={onClose}>
          <img src={logo} alt='Логотип' className='mobile-menu__image-logo' />
          <span className='mobile-menu__name-company'>ДЕЛАЙЗАБОР</span>
        </Link>
        <div className='mobile-menu__burger-container'>
          <a href='tel:+73833181026'>
            <img
              src={phoneIcon}
              alt='Телефон'
              className='mobile-menu__phone-icon'
            />
          </a>
          <button className='mobile-menu__close' onClick={onClose}></button>
        </div>
      </div>

      {/* Контент */}
      <nav className='mobile-menu__content'>
        <div className='mobile-menu__section'>
          <h3 className='mobile-menu__title'>Виды заборов</h3>
          <ul className='mobile-menu__list'>
            <FenceLinks cards={cards} linkClassName='mobile-menu__link' />
          </ul>
        </div>

        <div className='mobile-menu__section'>
          <Link
            to='/gallery'
            className='mobile-menu__title mobile-menu__title_link'
            onClick={onClose}
          >
            Наши работы
          </Link>
        </div>

        <div className='mobile-menu__section'>
          <Link
            to='/about-details'
            className='mobile-menu__title mobile-menu__title_link'
            onClick={onClose}
          >
            О нас
          </Link>
        </div>

        <div className='mobile-menu__section'>
          <Link
            to='/contacts'
            className='mobile-menu__title mobile-menu__title_link'
            onClick={onClose}
          >
            Контакты
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
