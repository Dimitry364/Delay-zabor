import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useOrderForm } from '../hooks/useOrderForm';
import { OrderPopupContext } from '../Context/OrderPopupContext';
import PhoneInput from 'react-phone-input-2';
import './OrderPopup.css';
import 'react-phone-input-2/lib/style.css';

function OrderPopup() {
  const { isOrderPopupOpen, closeOrderPopup, openSuccessPopup } =
    useContext(OrderPopupContext);

  // Используем кастомный хук для управления формой
  const {
    name,
    phone,
    nameError,
    phoneError,
    message,
    handleSubmit,
    handleNameChange,
    setPhone,
    setPhoneError,
  } = useOrderForm('RU'); // Передаём начальный код страны

  if (!isOrderPopupOpen) return null; // Если попап закрыт, не рендерим его

  const onPhoneChange = (value) => {
    setPhone(value);

    if (value.trim()) {
      setPhoneError('');
    }
  };

  return (
    <div
      className={`order-popup ${isOrderPopupOpen ? 'order-popup_opened' : ''}`}
    >
      <div className='order-popup__container'>
        <form
          className='order-popup__form'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(() => {
              closeOrderPopup();
              openSuccessPopup();
            });
          }}
        >
          <h2 className='order-popup__title'>Оставить заявку</h2>
          <p className='order-popup__subtitle'>
            Заполните форму и мы перезвоним вам в ближайшее время
          </p>

          <fieldset className='order-popup__fieldset'>
            {/* Поле для имени */}
            <label className='order-popup__label'>
              Ваше имя
              <input
                className={`order-popup__input ${
                  nameError ? 'order-popup__input_error' : ''
                }`}
                type='text'
                placeholder='Ваше имя'
                value={name}
                onChange={handleNameChange}
                autoComplete='name'
              />
              {nameError && (
                <span className='order-popup__error'>{nameError}</span>
              )}
            </label>

            {/* Поле для телефона + выбор страны */}
            <label className='order-popup__label'>
              Ваш телефон
              <div className='order-popup__phone-wrapper'>
                <PhoneInput
                  className='custom-phone-input'
                  country={'ru'}
                  disableDropdown
                  value={phone}
                  placeholder='+7 (999) 999-99-99'
                  onChange={onPhoneChange}
                  inputProps={{
                    name: 'tel',
                    autoComplete: 'tel',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '60px',
                    paddingLeft: '48px',
                    border: phoneError ? '1px solid red' : '1px solid #ccc',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    fontSize: '16px',
                    transition:
                      'border-color 0.2s ease, background-color 0.2s ease',
                  }}
                  buttonStyle={{
                    border: phoneError ? '1px solid red' : '1px solid #ccc',
                    backgroundColor: 'transparent',
                  }}
                />
              </div>
              {phoneError && (
                <span className='order-popup__error'>{phoneError}</span>
              )}
            </label>

            {/* Если пришёл ответ от сервера — выводим */}
            {message && <p className='order-popup__message'>{message}</p>}

            <button
              className='order-popup__submit-button'
              name='submit'
              type='submit'
              title='Отправить заявку'
            >
              Отправить
            </button>
          </fieldset>

          <button
            className='order-popup__cancel-button'
            type='button'
            onClick={closeOrderPopup}
          />
          <p className='order-popup__consent'>
            Нажимая на кнопку, вы даете согласие на обработку персональных
            данных и соглашаетесь c{' '}
            <Link to='/privacy'>политикой конфиденциальности</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default OrderPopup;
