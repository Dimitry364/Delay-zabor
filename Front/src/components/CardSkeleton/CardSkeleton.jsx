import React from 'react';
import './CardSkeleton.css';

const CardSkeleton = () => {
  return (
    <div className='card-details card-details__skeleton'>
      <div className='card-details__container'>
        <div className='card-details__content'>
          <div className='skeleton skeleton__image' />
          <div className='skeleton__info'>
            <div className='skeleton skeleton__title' />
            <div className='skeleton skeleton__spec' />
            <div className='skeleton skeleton__spec' />
            <div className='skeleton skeleton__spec' />
            <div className='skeleton skeleton__spec' />
            <div className='skeleton skeleton__price' />
            <div className='skeleton skeleton__price' />
          </div>
        </div>

        <div className='skeleton__section'>
          <div className='skeleton skeleton__subtitle' />
          <div className='skeleton__colors'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='skeleton skeleton__color' />
            ))}
          </div>
        </div>

        <div className='skeleton__section'>
          <div className='skeleton skeleton__subtitle' />
          <div className='skeleton__gates'>
            {[...Array(2)].map((_, i) => (
              <div key={i} className='skeleton skeleton__gate' />
            ))}
          </div>
        </div>

        <div className='skeleton__section'>
          <div className='skeleton skeleton__subtitle' />
          {[...Array(3)].map((_, i) => (
            <div key={i} className='skeleton skeleton__paragraph' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
