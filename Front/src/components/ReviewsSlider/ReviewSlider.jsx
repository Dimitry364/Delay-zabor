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

  useEffect(() => {
    reviewApi
      .getInitialReviews()
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => console.error('Ошибка при загрузке отзывов:', err));
  }, []);



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
