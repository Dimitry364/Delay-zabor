import React, { useContext } from 'react';
import { OrderPopupContext } from '../Context/OrderPopupContext';
import './CardDetailsInfo.css';

function CardDetailsInfo({
  nameDetails,
  installation_price,
  turnkey_price,
  specifications,
}) {
  const { openOrderPopup, isSuccessPopupOpen, closeSuccessPopup } =
    useContext(OrderPopupContext);

  return (
    <div className='card-details__info'>
      <h1 className='card-details__name'>
        Изготовление и монтаж <br />
        {nameDetails}
      </h1>
      <section className='card-details__section'>
        <p className='card-details__subtitle'>
          В Новосибирске и новосибирской области
        </p>
        {Object.keys(specifications).length > 0 && (
          <ul className='card-details__specifications'>
            {specifications.height && (
              <li className='card-details__list'>
                <strong className='card-details__strong'>Высота:</strong>{' '}
                {specifications.height}
              </li>
            )}
            {specifications.sheet_thickness && (
              <li className='card-details__list'>
                <strong className='card-details__strong'>Толщина листа:</strong>{' '}
                {specifications.sheet_thickness}
              </li>
            )}
            {specifications.profile && (
              <li className='card-details__list'>
                <strong className='card-details__strong'>Профиль:</strong>{' '}
                {Array.isArray(specifications.profile)
                  ? specifications.profile.join(', ')
                  : specifications.profile}
              </li>
            )}
            {specifications.coating && (
              <li className='card-details__list'>
                <strong className='card-details__strong'>Покрытие:</strong>{' '}
                {Array.isArray(specifications.coating)
                  ? specifications.coating.join(', ')
                  : specifications.coating}
              </li>
            )}
            {specifications.pillars && (
              <li className='card-details__list'>
                <strong className='card-details__strong'>Опоры:</strong>{' '}
                {Array.isArray(specifications.pillars)
                  ? specifications.pillars.join(', ')
                  : specifications.pillars}
              </li>
            )}
            {specifications.entrance_group && (
              <li className='card-details__list'>
                <strong className='card-details__strong'>
                  Ворота/Калитка:
                </strong>{' '}
                {Array.isArray(specifications.entrance_group)
                  ? specifications.entrance_group.join(', ')
                  : specifications.entrance_group}
              </li>
            )}
            {specifications.warranty && (
              <li className='card-details__list'>
                <strong className='card-details__strong'>Гарантия:</strong>{' '}
                {specifications.warranty}
              </li>
            )}
          </ul>
        )}
        <p className='card-details__price'>
          <strong className='card-details__strong'>Цена монтажа:</strong>{' '}
          {installation_price}
        </p>
        <p className='card-details__price'>
          <strong className='card-details__strong'>Цена под ключ:</strong>{' '}
          {turnkey_price}
        </p>
      </section>
      <button className='card-details__button-send' onClick={openOrderPopup}>
        Отправить заявку
      </button>
    </div>
  );
}

export default CardDetailsInfo;
