import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import arrowLeft from '../../images/arrow/arrowleft.svg';
import arrowRight from '../../images/arrow/arrowright.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import './WorkList.css';

function WorkList({ images, popupOpen }) {
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

  for (let i = 0; i < images.length; i += 2) {
    groupedCards.push(images.slice(i, i + 2));
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
            {groupedCards.map((imgGroup, index) => (
              <SwiperSlide key={index}>
                <div className='work-list__vertical-group'>
                  {imgGroup.map((imgUrl, ind) => (
                    <div className='work-list__item' key={ind}>
                      <img
                        className='work-list__image'
                        onClick={() => popupOpen(imgUrl)}
                        src={imgUrl}
                        alt={`Наша работа ${ind}`}
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
        images.map((imgUrl, index) => (
          <div key={index} className='work-list__item'>
            <img
              className='work-list__image'
              onClick={() => popupOpen(imgUrl)}
              src={imgUrl}
              alt={`Наша работа ${index}`}
            ></img>
          </div>
        ))
      )}
      {}
    </div>
  );
}

export default WorkList;
