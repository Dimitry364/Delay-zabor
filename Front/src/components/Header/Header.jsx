import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header/logoDark.svg';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/' className='header__link-logo'>
          <img
            className='header__image-logo'
            src={logo}
            alt='Логотип Movie Explorer'
          ></img>
          <h2 className='header__name-company'>ДЕЛАЙЗАБОР</h2>
        </Link>
        <div className='header__link-container'>
          <div className='header__dropdown'>
            <span className='header__dropdown-title'>Виды заборов</span>
            <div className='header__dropdown-content'>
              <div className='header__dropdown-arrow'></div>
              <Link to='/works/profnastil' className='header__dropdown-link'>
                Забор из профнастила
              </Link>
              <Link to='/works/proftruba' className='header__dropdown-link'>
                Забор из профтрубы
              </Link>
              <Link to='/works/euroshaketnik' className='header__dropdown-link'>
                Забор из евроштакетника
              </Link>
              <Link to='/works/rabica' className='header__dropdown-link'>
                Забор из сетки рабица
              </Link>
              <Link to='/works/policarbonat' className='header__dropdown-link'>
                Забор из поликарбоната
              </Link>
              <Link to='/works/kova' className='header__dropdown-link'>
                Забор ковкой
              </Link>
              <Link to='/works/3d' className='header__dropdown-link'>
                Забор 3D
              </Link>
            </div>
          </div>

          <Link to='/works' className='header__link'>
            Наши работы
          </Link>
          <Link to='/about' className='header__link'>
            О нас
          </Link>
          <Link to='/contacts' className='header__link'>
            Контакты
          </Link>
        </div>
        <a className='header__link-phone header__link' href='tel:+73833181026'>
          +7 (383) 318 10 26
        </a>
        <button className='header_button-query'>Оставить заявку</button>
      </div>
    </header>
  );
}

export default Header;
