import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import CardDetails from '../CardDetails/CardDetails';
import GalleryPage from '../GalleryPage/GalleryPage';
import AboutDetails from '../AboutDetails/AboutDetails';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/card/:_id' element={<CardDetails />}></Route>
        <Route path='/gallery' element={<GalleryPage />}></Route>
        <Route path='/about-details' element={<AboutDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
