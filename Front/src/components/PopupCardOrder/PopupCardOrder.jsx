import React from 'react';
import QueryApi from '../utils/QueryApi';
import './PopupCardOrder.css';

function PopupCardOrder({ cardName, cardCount, onClose, isPopupOpen }) {
  const [companyName, setCompanyName] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isAgreed, setIsAgreed] = React.useState(false);
  const [popupMessage, setPopupMessage] = React.useState('');
  const [isAgreedMessage, setIsAgreedMessage] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handeleCompanyName = (e) => setCompanyName(e.target.value);
  const handeleFullName = (e) => setFullName(e.target.value);
  const handelePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handeleAddress = (e) => setAddress(e.target.value);
  const handeleEmail = (e) => setEmail(e.target.value);
  const handeleMessage = (e) => setPopupMessage(e.target.value);
  const handeleIsAgreed = (e) => setIsAgreed(e.target.checked);

  React.useEffect(() => {
    setPopupMessage(`${cardName}, Количество тонн: ${cardCount}`);
  }, [cardName, cardCount]);

  const resetForm = () => {
    setCompanyName('');
    setFullName('');
    setPhoneNumber('');
    setAddress('');
    setIsAgreed(false);
    setPopupMessage('');
    setMessage('');
    setIsAgreedMessage('');
    setEmail('');
  };

  React.useEffect(() => {
    if (!isPopupOpen) {
      resetForm();
    }
  }, [isPopupOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.target.reset();

    if (!isAgreed) {
      setIsAgreedMessage(
        'Согласие с политикой обязательно для отправки формы.'
      );
      return;
    }

    const requestData = {
      companyName,
      fullName,
      phoneNumber,
      address,
      isAgreed,
      message,
      email,
    };

    QueryApi.registerQuery(requestData)
      .then(() => {
        setMessage('Заявка успешно создана, скоро мы с вами свяжемся)');
      })
      .catch((err) => {
        console.error('Ошибка при создании заявки', err);
        setMessage('Ошибка при создании заявки');
      });
  };

  return (
    <div className={`popup ${isPopupOpen ? `popup_opened` : ''}`}>
      <div className='popup__container'>
        <form className='popup__form' onSubmit={handleSubmit}>
          <h2 className='popup__title'>Оформить заказ</h2>
          <fieldset className='popup__fieldset'>
            <div className='popup__field'>
              <input
                className='popup__input'
                type='text'
                minLength='2'
                maxLength='40'
                name='name'
                placeholder='ФИО'
                value={fullName}
                onChange={handeleFullName}
              />
            </div>
            <div className='popup__field'>
              <input
                className='popup__input'
                type='text'
                minLength='2'
                maxLength='250'
                name='companyName'
                placeholder='Ип / Название компании'
                value={companyName}
                onChange={handeleCompanyName}
                required
              />
            </div>
            <div className='popup__field'>
              <input
                className='popup__input'
                type='text'
                minLength='2'
                maxLength='30'
                name='email'
                placeholder='email'
                value={email}
                onChange={handeleEmail}
                required
              />
            </div>
            <div className='popup__field'>
              <input
                className='popup__input'
                type='tel'
                minLength='2'
                maxLength='12'
                name='phoneNumber'
                placeholder='Номер телефона'
                value={phoneNumber}
                onChange={handelePhoneNumber}
                required
              />
            </div>
            <div className='popup__field'>
              <input
                className='popup__input'
                type='text'
                minLength='2'
                maxLength='30'
                name='street'
                placeholder='Город'
                value={address}
                onChange={handeleAddress}
                required
              />
            </div>

            <div className='popup__field'>
              <textarea
                className='popup__textarea'
                rows='4'
                cols='43'
                type='text'
                minLength='10'
                maxLength='140'
                name='about'
                placeholder='Укажите что вас интересует'
                value={popupMessage}
                onChange={handeleMessage}
                required
              />
            </div>
            <div>
              <label className='popup__label'>
                <input
                  className='popup__input popup__input_checkbox'
                  type='checkbox'
                  checked={isAgreed}
                  onChange={handeleIsAgreed}
                />
                Согласен на обработку персональных данных
              </label>
              {isAgreedMessage && !isAgreed && (
                <span className='popup__add-link-input-error popup__input-error'>
                  {isAgreedMessage}
                </span>
              )}
              {message && (
                <span className='popup__add-link-input-error popup__input-error'>
                  {message}
                </span>
              )}
            </div>

            <button
              className='popup__submit-button'
              name='submit'
              type='submit'
              title='Отправить заявку'
              // onClick={onClose}
            >
              Отправить заявку
            </button>
          </fieldset>
          <button
            className='popup__cancel-button'
            type='button'
            onClick={onClose}
          />
        </form>
      </div>
    </div>
  );
}

// export default PopupCardOrder;
