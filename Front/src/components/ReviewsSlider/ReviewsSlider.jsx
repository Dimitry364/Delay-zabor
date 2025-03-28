import React, { useState, useEffect, useRef } from 'react';
import arrowLeft from '../../images/review/left.svg';
import arrowRight from '../../images/review/right.svg';
import reviewApi from '../utils/ReviewApi';
import './ReviewsSlider.css';

const ReviewsSlider = () => {
  // Состояние для отзывов, полученных из API
  const [reviews, setReviews] = useState([]);
  // Текущий индекс слайда (начинаем с 1, так как 0 – это клон последнего отзыва)
  const [index, setIndex] = useState(1);
  // Флаг, управляющий наличием анимации перехода
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  // Состояния для управления показом попапа с формой и значениями полей формы
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  // Состояние для ширины одного слайда (в пикселях)
  const [slideWidth, setSlideWidth] = useState(0);
  // Реф для элемента-viewport, чтобы вычислять его ширину
  const viewportRef = useRef(null);

  // При монтировании компонента запрашиваем отзывы с сервера через API
  useEffect(() => {
    reviewApi
      .getInitialReviews()
      .then((data) => {
        // Предполагается, что API возвращает массив отзывов
        setReviews(data);
      })
      .catch((err) => console.error('Ошибка при загрузке отзывов:', err));
  }, []);

  // При загрузке и изменении размера окна вычисляем ширину одного слайда
  useEffect(() => {
    const updateWidth = () => {
      if (!viewportRef.current) return;
      const containerWidth = viewportRef.current.offsetWidth;
      // Определяем число видимых слайдов в зависимости от ширины окна:
      // 3 на десктопе (>=1024px), 2 на планшете (>=768px) и 1 на мобильном
      let visibleCount = 1;
      if (window.innerWidth >= 1024) {
        visibleCount = 3;
      } else if (window.innerWidth >= 768) {
        visibleCount = 2;
      }
      // Ширина одного слайда равна ширине контейнера, делённой на число видимых слайдов
      setSlideWidth(containerWidth / visibleCount);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Формируем расширенный массив слайдов для зацикливания
  // Если отзывов ещё нет – extendedSlides будет пустым
  const extendedSlides =
    reviews.length > 0
      ? [reviews[reviews.length - 1], ...reviews, reviews[0]]
      : [];

  // Обработчики стрелок – листаем по одному слайду за раз
  const nextSlide = () => {
    if (extendedSlides.length === 0) return;
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (extendedSlides.length === 0) return;
    setIndex((prev) => prev - 1);
  };

  // Обработка окончания CSS-перехода
  // Если достигли клона первого слайда (индекс равен extendedSlides.length - 1),
  // мгновенно переключаемся на реальный первый слайд (индекс 1)
  // Аналогично, если индекс равен 0 – переключаемся на последний реальный слайд
  const handleTransitionEnd = () => {
    if (index === extendedSlides.length - 1) {
      setTransitionEnabled(false);
      setTimeout(() => {
        setIndex(1);
      }, 0);
    }
    if (index === 0) {
      setTransitionEnabled(false);
      setTimeout(() => {
        setIndex(extendedSlides.length - 2);
      }, 0);
    }
  };

  // После переключения без анимации включаем её обратно
  useEffect(() => {
    if (!transitionEnabled) {
      const id = setTimeout(() => {
        setTransitionEnabled(true);
      }, 0);
      return () => clearTimeout(id);
    }
  }, [transitionEnabled]);

  // Обработка отправки формы «Оставить отзыв»
  const handleSubmit = (e) => {
    e.preventDefault();
    // Отправляем новый отзыв через API
    reviewApi
      .addReview({ name, text })
      .then((newReview) => {
        // Добавляем новый отзыв в конец списка отзывов
        setReviews((prev) => [...prev, newReview]);
        // Если требуется – можно перезагрузить все отзывы, вызвав reviewApi.getInitialReviews()
      })
      .catch((err) => console.error('Ошибка при добавлении отзыва:', err));
    // Сбрасываем значения формы и закрываем попап
    setName('');
    setText('');
    setShowForm(false);
  };

  return (
    <div className='reviews-slider'>
      {/* Обёртка для видимой области слайдов */}
      <div className='reviews-slider__viewport' ref={viewportRef}>
        <div
          className='reviews-slider__track'
          style={{
            // Смещаем трек влево на индекс * ширина слайда
            transform: `translateX(-${index * slideWidth}px)`,
            transition: transitionEnabled ? 'transform 0.5s ease' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((review, i) => (
            <div className='reviews-slider__slide' key={i}>
              <p className='reviews-slider__text'>“{review.text}”</p>
              <p className='reviews-slider__author'>— {review.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Стрелки навигации (по краям) */}
      <button
        className='reviews-slider__arrow reviews-slider__arrow--left'
        onClick={prevSlide}
      >
        <img src={arrowLeft} alt='Предыдущий' />
      </button>
      <button
        className='reviews-slider__arrow reviews-slider__arrow--right'
        onClick={nextSlide}
      >
        <img src={arrowRight} alt='Следующий' />
      </button>

      {/* Нижний блок с кнопками "Оставить отзыв" и "Подробнее" */}
      <div className='reviews-slider__footer'>
        <button
          className='reviews-slider__button reviews-slider__button--feedback'
          onClick={() => setShowForm(true)}
        >
          Оставить отзыв
        </button>
        <a
          href='/all-reviews'
          className='reviews-slider__button reviews-slider__button--more'
        >
          Подробнее
        </a>
      </div>

      {/* Всплывающее окно с формой отзыва */}
      {showForm && (
        <div
          className='reviews-slider__overlay'
          onClick={() => setShowForm(false)}
        >
          <div
            className='reviews-slider__popup'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='reviews-slider__close'
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <form className='reviews-slider__form' onSubmit={handleSubmit}>
              <h3 className='reviews-slider__form-title'>Оставить отзыв</h3>
              <input
                className='reviews-slider__input'
                type='text'
                name='name'
                placeholder='Ваше имя'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                className='reviews-slider__textarea'
                name='text'
                placeholder='Ваш отзыв'
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <button type='submit' className='reviews-slider__submit'>
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSlider;
