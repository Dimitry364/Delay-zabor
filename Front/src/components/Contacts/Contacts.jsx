import React from 'react';
import { useOrderForm } from '../hooks/useOrderForm';
import './Contacts.css';

function Contacts() {
  const {
    name,
    setName,
    phone,
    setPhone,
    countryCode,
    setCountryCode,
    nameError,
    phoneError,
    message,
    handleSubmit,
  } = useOrderForm('RU');

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className='contacts'>
      <div className='contacts__container'>
        {/*Левая колонка с контактами */}
        <div className='contacts__info'>
          <h1 className='contacts__title'>Контакты</h1>
          <ul className='contacts__list'>
            <li className='contacts__item'>
              Телефон: <a href='tel:+73833181026'>+7 383 318 10 26</a>
            </li>
            <li className='contacts__item'>
              Телефон: <a href='tel:+73832279303'>+7 (383)227 93 03</a>
            </li>
            <li className='contacts__item'>
              E-mail:{' '}
              <a href='mailto:zabor2279303@mail.ru'>zabor2279303@mail.ru</a>
            </li>
          </ul>
        </div>
        {/* Правая колонка с формой */}
        <form className='contacts__form' onSubmit={submitForm}>
          <label className='contacts__label'>
            Ваше имя
            <input
              className={`contacts__input ${
                nameError ? 'contacts__input_error' : ''
              }`}
              type='text'
              placeholder='Ваше имя'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <span className='contacts__error'>{nameError}</span>}
          </label>

          <label className='contacts__label'>
            Ваш телефон
            <input
              className={`contacts__input ${
                phoneError ? 'contacts__input_error' : ''
              }`}
              type='tel'
              placeholder='+7 (999) 999-99-99'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && (
              <span className='contacts__error'>{phoneError}</span>
            )}
          </label>

          {/* Если сообщение есть (успех/ошибка), выводим */}
          {message && <p className='contacts__message'>{message}</p>}

          <button className='contacts__button' type='submit'>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacts;
