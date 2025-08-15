import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header/logoDark.svg';
import phoneIcon from '../../images/header/phone-icon.svg';
import FenceLinks from '../FenceLinks/FenceLinks';
import { OrderPopupContext } from '../Context/OrderPopupContext';
import { CardsContext } from '../Context/CardsContext';
import './Header.css';
import MobileMenu from '../MobileMenu/MobileMenu';

function Header() {
  const { openOrderPopup } = useContext(OrderPopupContext);
  const { cards } = useContext(CardsContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
        <Link to='tel:+79232279303' className='header__link-phone'>
          <img
            className='header__link-phone-icon header__link'
            src={phoneIcon}
            alt='Иконка телефона'
          />
          <p className='header__link-phone-number header__link'>
          +7 923 227-93-03
          </p>
        </Link>

        <button className='header_button-query' onClick={openOrderPopup}>
          Оставить заявку
        </button>

        {/* Только бургер-кнопка */}
        <div className='header__burger-container'>
          <Link to='tel:+79232279303' className='header__link-b'>
            <img
              className='header__link-phone-icon-burger header__link'
              src={phoneIcon}
              alt='Иконка телефона'
            />
          </Link>
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
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cards={cards}
      />
    </header>
  );
}

export default Header;
