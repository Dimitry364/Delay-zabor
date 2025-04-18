import { useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import OrderFormApi from '../utils/OrderFormApi';

const phoneUtil = PhoneNumberUtil.getInstance();

export function useOrderForm(initialCountryCode = 'RU') {
  // Состояние формы
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Состояния для ошибок
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Состояние для сообщения об успехе/ошибке отправки
  const [message, setMessage] = useState('');

  function validatePhone(phoneStr, country) {
    try {
      //Парсим номер через библиотеку google-libphonenumber
      const number = phoneUtil.parseAndKeepRawInput(phoneStr, country);

      if (!phoneUtil.isValidNumber(number)) {
        return 'Неверный номер телефона';
      }

      return '';
    } catch (error) {
      return 'Неверный номер телефона';
    }
  }

  //Функция валидации всей формы
  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Обязательное поле');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!phone.trim()) {
      setPhoneError('Обязательное поле');
      isValid = false;
    } else {
      const error = validatePhone(phone, countryCode);
      if (error) {
        setPhoneError(error);
        isValid = false;
      } else {
        setPhoneError('');
      }
    }

    return isValid;
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    // Если пользователь что-то вводит, сбрасываем ошибку для имени
    if (evt.target.value.trim()) {
      setNameError('');
    }
  };

  // Функция отправки данных формы на сервер
  const handleSubmit = async (onSuccessCallback) => {
    // Сначала проверяем форму
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await OrderFormApi.registerOrder(name, `+${countryCode} ${phone}`);
      setMessage('Заявка успешно создана, скоро мы с вами свяжемся!');
      // Очищаем поля после успешной отправки
      setName('');
      setPhone('');
      setCountryCode(initialCountryCode);

      if (onSuccessCallback) onSuccessCallback();

      // GTM событие
      if (window && window.dataLayer) {
        window.dataLayer.push({ event: 'form_submit' });
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      setMessage('Ошибка при создании заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    countryCode,
    setCountryCode,
    nameError,
    phoneError,
    message,
    validateForm,
    handleSubmit,
    setPhoneError,
    handleNameChange,
    isSubmitting,
  };
}
