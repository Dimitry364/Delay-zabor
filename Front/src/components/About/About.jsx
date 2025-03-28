import React from 'react';
import AboutList from '../AboutList/AboutList';
import './About.css';

function About() {
  return (
    <section className='about'>
      <div className='about__content'>
        <AboutList />
      </div>
    </section>
  );
}

export default About;
