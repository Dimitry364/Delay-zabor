import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className='loader-wrapper'>
      <div className='loader' />
      <p className='loader-text'>Загрузка...</p>
    </div>
  );
}

export default Loader;
