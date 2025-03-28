import React from 'react';
import './AboutSection.css';

function AboutSection({
  title,
  textBlocks,
  image,
  isReversed,
  showButton,
  buttonComponent,
}) {
  return (
    <div
      className={`about-section__item ${
        isReversed ? 'about-section__item_reverse' : ''
      }`}
    >
      <div className='about-section__text'>
        {title}
        {textBlocks.map((text, index) => (
          <p key={index}>
            {text.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        ))}
        {showButton && buttonComponent ? (
          <div className='about-section__button-container'>
            {buttonComponent}
          </div>
        ) : null}
      </div>
      <div className='about-section__image-container'>
        <img
          className='about-section__image'
          src={image}
          alt='Изображение о нас'
        />
      </div>
    </div>
  );
}

export default AboutSection;
