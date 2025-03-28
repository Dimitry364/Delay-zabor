import React from 'react';
import { Link } from 'react-router-dom';

function NavLinks({ onLinkClick, className }) {
  return (
    <ul className={className}>
      <li>
        <Link
          to='/gallery'
          className='header__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Наши работы
        </Link>
      </li>
      <li>
        <Link
          to='/about-details'
          className='header__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          О нас
        </Link>
      </li>
      <li>
        <Link
          to='/contacts'
          className='header__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Контакты
        </Link>
      </li>
    </ul>
  );
}

export default NavLinks;
