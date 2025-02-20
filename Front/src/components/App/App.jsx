import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import CardDetails from '../CardDetails/CardDetails';
// import Footer from '../Footer/Footer';
// import Basket from '../Basket/Basket';
// import PopupCardOrder from '../PopupCardOrder/PopupCardOrder';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/card/:_id' element={<CardDetails />}></Route>
        {/* <Route path='/basket' element={<Basket />}></Route> */}
      </Routes>
      {/* <Footer />  */}
      {/* <PopupCardOrder
        cardName={selectedCard?.name}
        cardCount={selectedCard?.count}
        onClose={handlePopupClose}
        isPopupOpen={isPopupOpen}
      /> */}
    </div>
  );
}

export default App;
