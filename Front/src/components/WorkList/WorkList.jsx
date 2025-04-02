import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import arrowLeft from '../../images/arrow/arrowleft.svg';
import arrowRight from '../../images/arrow/arrowright.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import './WorkList.css';

function WorkList({ cards, popupOpen }) {
  const [isMobile, setIsmobile] = useState(window.innerWidth <= 768);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsmobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    //очистка слушателя при размонтировании
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const swiperNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const swiperPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  //Группируем по 2 карточки на слайд
  const groupedCards = [];
  for (let i = 0; i < cards.length; i += 2) {
    groupedCards.push(cards.slice(i, i + 2));
  }

  return (
    <div className='work-list'>
      {isMobile ? (
        <>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            spaceBetween={16}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation]}
            className='swiper__works'
          >
            {groupedCards.map((cardsGroup, index) => (
              <SwiperSlide key={index}>
                <div className='work-list__vertical-group'>
                  {cardsGroup.map((card) => (
                    <div className='work-list__item'>
                      <img
                        className='work-list__image'
                        onClick={() => popupOpen(card)}
                        src={card.image}
                        alt={card.name}
                      />
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='swiper-nav-arrows'>
            <button className='custom-swiper-button-prev' onClick={swiperPrev}>
              <img
                src={arrowLeft}
                alt='Стрелка влево'
                className='work-list__arrow'
              />
            </button>
            <button className='custom-swiper-button-next' onClick={swiperNext}>
              <img
                src={arrowRight}
                alt='Стрелка влево'
                className='work-list__arrow'
              />
            </button>
          </div>
        </>
      ) : (
        cards.map((card) => (
          <div key={card.id} className='work-list__item'>
            <img
              className='work-list__image'
              onClick={() => popupOpen(card)}
              src={card.image}
              alt={card.name}
            ></img>
          </div>
        ))
      )}
      {}
    </div>
  );
}

export default WorkList;
