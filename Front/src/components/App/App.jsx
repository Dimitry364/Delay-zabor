import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import CardDetails from '../CardDetails/CardDetails';
// import Footer from '../Footer/Footer';
// import Basket from '../Basket/Basket';
import PopupCardOrder from '../PopupCardOrder/PopupCardOrder';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = (card) => {
    setSelectedCard(card);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedCard(null);
    setIsPopupOpen(false);
  };

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main onOrderClick={handlePopupOpen} />} />
        <Route path='/card/:_id' element={<CardDetails />}></Route>
        {/* <Route path='/basket' element={<Basket />}></Route> */}
      </Routes>
      {/* <Footer />  */}
      <PopupCardOrder
        cardName={selectedCard?.name}
        cardCount={selectedCard?.count}
        onClose={handlePopupClose}
        isPopupOpen={isPopupOpen}
      />
    </div>
  );
}

export default App;
