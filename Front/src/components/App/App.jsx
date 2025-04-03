import './App.css';
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  OrderPopupContext,
  OrderPopupProvider,
} from '../Context/OrderPopupContext';
import { CardsProvider } from '../Context/CardsContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import CardDetails from '../CardDetails/CardDetails';
import GalleryPage from '../GalleryPage/GalleryPage';
import AboutDetails from '../AboutDetails/AboutDetails';
import Contacts from '../Contacts/Contacts';
import OrderPopup from '../OrderPopup/OrderPopup';
import Footer from '../Footer/Footer';
import Privacy from '../Privacy/Privacy';
import SuccessPopup from '../SuccessPopup/SuccessPopup';

function App() {
  const { isSuccessPopupOpen, closeSuccessPopup } =
    useContext(OrderPopupContext);
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/card/:_id' element={<CardDetails />}></Route>
        <Route path='/gallery' element={<GalleryPage />}></Route>
        <Route path='/about-details' element={<AboutDetails />}></Route>
        <Route path='/contacts' element={<Contacts />}></Route>
        <Route path='/privacy' element={<Privacy />}></Route>
      </Routes>
      <OrderPopup />
      {isSuccessPopupOpen && <SuccessPopup onClose={closeSuccessPopup} />}
      <Footer />
    </div>
  );
}

export default App;
