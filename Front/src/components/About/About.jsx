// src/components/About/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AboutList from '../AboutList/AboutList';
import AboutImage1 from '../../images/about/aboutImage1.png';
import './About.css';

function About() {
  return (
    <section className='about'>
      <div className='about__content'>
        <div className='about__text'>
          <AboutList />
          <Link to='/about-details' className='about__button'>
            Подробнее
          </Link>
        </div>
        {/* Предположим, на главной картинка располагается справа */}
        <div className='about__image-container'>
          <img className='about-list__image' src={AboutImage1} alt='Работяга' />
        </div>
      </div>
    </section>
  );
}

export default About;
