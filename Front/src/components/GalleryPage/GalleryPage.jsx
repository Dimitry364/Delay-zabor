import React, { useEffect, useState } from 'react';
import CardApi from '../utils/CardsApi';
import WorkList from '../WorkList/WorkList';
import OrderForm from '../OrderForm/OrderForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import './GalleryPage.css';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import CardError from '../CardError/CardError';

const GalleryPage = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  const handlePopupOpen = (card) => {
    setSelectedCard(card);
  };

  const handlePopupClose = () => {
    setSelectedCard(null);
  };

  const handlePopupCloseClickByOverlay = (e) => {
    if (e.target.classList.contains('popup')) {
      handlePopupClose();
    }
  };

  useEffect(() => {
    CardApi.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        setError(
          'Ошибка в получении карточки, попробуйте презагрузить страницу'
        );
        console.log('Ошибка в получении карточки');
        console.error(err);
      });
  }, []);

  if (error) {
    return (
      <CardError message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (cards.length === 0) {
    return <Loader />;
  }

  return (
    <div className='gallery'>
      <div className='gallery__container'>
        <h1 className='gallery__title'>Наши работы</h1>
        <WorkList cards={cards} popupOpen={handlePopupOpen} />
      </div>
      <OrderForm title='Остались вопросы?' />
      <ImagePopup
        card={selectedCard}
        onClose={handlePopupClose}
        onCloseClickOverlay={handlePopupCloseClickByOverlay}
      />
    </div>
  );
};

export default GalleryPage;
