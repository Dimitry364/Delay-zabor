import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OrderPopupProvider } from '../Context/OrderPopupContext';
import { CardsProvider } from '../Context/CardsContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import CardDetails from '../CardDetails/CardDetails';
import GalleryPage from '../GalleryPage/GalleryPage';
import AboutDetails from '../AboutDetails/AboutDetails';
import Contacts from '../Contacts/Contacts';
import OrderPopup from '../OrderPopup/OrderPopup';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className='App'>
      <CardsProvider>
        <OrderPopupProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/card/:_id' element={<CardDetails />}></Route>
            <Route path='/gallery' element={<GalleryPage />}></Route>
            <Route path='/about-details' element={<AboutDetails />}></Route>
            <Route path='/contacts' element={<Contacts />}></Route>
          </Routes>
          <Footer />
          <OrderPopup />
        </OrderPopupProvider>
      </CardsProvider>
    </div>
  );
}

export default App;
