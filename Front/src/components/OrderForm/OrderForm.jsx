import React, { useState } from 'react';
import './OrderForm.css';
import orderFormApi from '../utils/OrderFormApi';

function OrderForm({title}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // Хранение ошибок валидации для каждого поля
  const [error, setError] = useState({ name: false, phone: false });
  // Сообщение об успешной отправке или ошибке
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Валидация имени: значение должно быть не пустым
  const validateName = (value) => value.trim().length > 1;
  // Валидация телефона: простое регулярное выражение, можно доработать
  const validatePhone = (value) => {
    const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;
    return phoneRegex.test(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);

    // Если хотя бы одно поле не валидно, отображаем сообщение об ошибке
    if (!isNameValid || !isPhoneValid) {
      setError({
        name: !isNameValid,
        phone: !isPhoneValid,
      });
      setMessage({
        text: 'Пожалуйста, заполните все обязательные поля',
        type: 'error',
      });
      return;
    } else {
      setError({ name: false, phone: false });
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    try {
      // Отправка данных формы через API
      await orderFormApi.registerOrder(name, phone);
      setMessage({ text: 'Форма успешно отправлена!', type: 'success' });
      setName('');
      setPhone('');
    } catch (err) {
      setMessage({
        text: 'Ошибка при отправке данных. Попробуйте позже.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='order-form'>
      <div className='order-form__container'>
        <h2 className='order-form__title'>{title}</h2>
        <p className='order-form__subtitle'>
          Заполните форму и мы перезвоним вам в ближайшее время
        </p>

        <form onSubmit={handleSubmit} className='order-form__form'>
          <input
            type='text'
            autoComplete='name'
            className={`order-form__input ${
              error.name ? 'order-form__input--error' : ''
            }`}
            placeholder='Ваше имя'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='tel'
            autoComplete='tel'
            className={`order-form__input ${
              error.phone ? 'order-form__input--error' : ''
            }`}
            placeholder='Ваш телефон'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            type='submit'
            className='order-form__button'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Заказать звонок'}
          </button>
        </form>

        {/* Отображение сообщения: красное для ошибок, зелёное для успеха */}
        {message.text && (
          <div
            className={`order-form__message ${
              message.type === 'error'
                ? 'order-form__message--error'
                : 'order-form__message--success'
            }`}
          >
            {message.text}
          </div>
        )}

        <p className='order-form__consent'>
          Нажимая на кнопку, вы даете согласие на обработку персональных данных
          и соглашаетесь с политикой конфиденциальности
        </p>
      </div>
    </div>
  );
}

export default OrderForm;
