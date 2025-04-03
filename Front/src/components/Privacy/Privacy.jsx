import React from 'react';
import './Privacy.css';
import privacyText from '../utils/privacyText';

function Privacy() {
  return (
    <section className='privacy'>
      <div className='privacy__container'>
        <h1 className='privacy__title'>
          Политика в отношении обработки персональных данных
        </h1>
        <p className='privacy__text'>{privacyText}</p>
      </div>
    </section>
  );
}

export default Privacy;
