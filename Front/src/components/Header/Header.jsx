import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header/logoDark.svg';
import FenceLinks from '../FenceLinks/FenceLinks';
import { OrderPopupContext } from '../Context/OrderPopupContext';
import { CardsContext } from '../Context/CardsContext';
import './Header.css';

function Header() {
  const { openOrderPopup } = useContext(OrderPopupContext);
  const { cards } = useContext(CardsContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/' className='header__link-logo'>
          <img className='header__image-logo' src={logo} alt='Логотип' />
          <h2 className='header__name-company'>ДЕЛАЙЗАБОР</h2>
        </Link>

        {/* Десктоп меню (не трогаем) */}
        <div className='header__link-container'>
          <div className='header__dropdown'>
            <span className='header__dropdown-title'>Виды заборов</span>
            <div className='header__dropdown-content'>
              <div className='header__dropdown-arrow'></div>
              <ul className='header__dropdown-list'>
                <FenceLinks
                  cards={cards}
                  linkClassName='header__dropdown-link'
                />
              </ul>
            </div>
          </div>
          <Link to='/gallery' className='header__link'>
            Наши работы
          </Link>
          <Link to='/about-details' className='header__link'>
            О нас
          </Link>
          <Link to='/contacts' className='header__link'>
            Контакты
          </Link>
        </div>

        <a className='header__link-phone header__link' href='tel:+73833181026'>
          +7 (383) 318 10 26
        </a>
        <button className='header_button-query' onClick={openOrderPopup}>
          Оставить заявку
        </button>

        {/* Только бургер-кнопка */}
        <button
          className='header__burger'
          onClick={toggleMobileMenu}
          aria-label='Меню'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Только мобильное меню */}
      <div
        className={`header__mobile-menu ${
          isMobileMenuOpen ? 'header__mobile-menu_open' : ''
        }`}
      >
        <button className='header__mobile-close' onClick={closeMobileMenu}>
          &times;
        </button>
        <ul className='header__mobile-list'>
          <FenceLinks cards={cards} linkClassName='header__menu-link' />
          <li>
            <Link
              to='/gallery'
              className='header__menu-link'
              onClick={closeMobileMenu}
            >
              Наши работы
            </Link>
          </li>
          <li>
            <Link
              to='/about-details'
              className='header__menu-link'
              onClick={closeMobileMenu}
            >
              О нас
            </Link>
          </li>
          <li>
            <Link
              to='/contacts'
              className='header__menu-link'
              onClick={closeMobileMenu}
            >
              Контакты
            </Link>
          </li>
        </ul>
        <a href='tel:+73833181026' className='header__menu-phone'>
          +7 (383) 318 10 26
        </a>
        <button
          className='header__menu-button'
          onClick={() => {
            openOrderPopup();
            closeMobileMenu();
          }}
        >
          Оставить заявку
        </button>
      </div>
    </header>
  );
}

export default Header;
