import React from 'react';
import { useParams } from 'react-router-dom';
import CardApi from '../utils/CardsApi';
import BasketApi from '../utils/BasketApi';
import './CardDetails.css';

function CardDetails() {
  const { _id } = useParams(); //Получаем Id из URL
  const [card, setCard] = React.useState({});
  const [error, setError] = React.useState(null);
  const [count, setCount] = React.useState(1);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    CardApi.getCardDetails({ _id })
      .then((cardData) => {
        setCard(cardData);
      })
      .catch((err) => {
        console.error('Ошибка в получении карточки', err);
        setError('Карточка не найдена');
      });
  }, [_id]);

  const handelChangeCount = (evt) => {
    const value = Math.max(1, evt.target.value);
    setCount(value);
  };

  const handleAddBasket = () => {
    BasketApi.addCardInBasket({ _id, count })
      .then(() => {
        setMessage('Товар успешно добавлен в корзину!');
      })
      .catch((err) => {
        console.error('Ошибка при добавлении в корзину', err);
        setMessage('Ошибка при добавлении в корзину');
      });
  };

  const cardСharacteristics = () => {
    if (typeof card.characteristic === 'string') {
      return card.characteristic
        .split(',')
        .map((characteristic, index) => <p key={index}>{characteristic}</p>);
    }
  };

  const cardDescription = () => {
    if (typeof card.description === 'string') {
      return card.description.split('.').map((description, index) => (
        <p key={index} className='card__details_description'>
          {description}
        </p>
      ));
    }
  };

  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  // Функция для обработки движения мыши
  const handleMouseMove = (event) => {
    // Получаем размеры окна браузера
    const { innerWidth, innerHeight } = window;

    // Вычисляем процентное положение курсора по осям X и Y
    const mouseX = event.clientX / innerWidth;
    const mouseY = event.clientY / innerHeight;

    // Устанавливаем смещение в пределах от -10 до 10 пикселей
    const maxOffset = 50; // Максимальное смещение
    const x = (mouseX - 0.5) * 2 * maxOffset;
    const y = (mouseY - 0.5) * 2 * maxOffset;

    setOffset({ x, y });
  };

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <div className='card__details'>
      {card && (
        <div className='card__details_container'>
          <div className='card__details_content'>
            <div className='card__details_image-container'>
              <img
                className='card__details_image'
                src={card.imageSrc}
                alt={card.name}
              />
            </div>
            <div className='card__details_info'>
              <h1 className='card__details_name'>{card.name}</h1>
              <div className='card__details_characteristics'>
                <h3 className='card__details_characteristics_title'>
                  Краткие характеристики:
                </h3>
                {cardСharacteristics()}
              </div>
              <div className='card__details_add-to-basket'>
                <label className='card__details_label' htmlFor='count'>
                  Количество тонн:
                </label>
                <input
                  className='card__details_input'
                  id='count'
                  type='number'
                  min='1'
                  value={count}
                  onChange={handelChangeCount}
                />
                <button
                  className='card__details_button'
                  onClick={handleAddBasket}
                >
                  Добавить в корзину
                </button>
                {message && <p className='card__details_message'>{message}</p>}
              </div>
            </div>
          </div>
          {/* <p className='card__details_description'>{card.description}</p> */}
          {cardDescription()}

          <div
            className='container'
            onMouseMove={handleMouseMove} // Отслеживание движения мыши
            onMouseLeave={handleMouseLeave} // Отслеживание движения мыши
          >
            {/* Массив блоков, каждый с индивидуальным смещением */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className='block'
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px)`, // Смещение блока
                }}
              >
                Блок {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <p className='error'>{error}</p>}
    </div>
  );
}

export default CardDetails;
