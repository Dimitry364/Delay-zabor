import React from 'react';
import CardApi from '../utils/CardsApi';
import WorkList from '../WorkList/WorkList';
import OrderForm from '../OrderForm/OrderForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import './GalleryPage.css';

const GalleryPage = () => {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

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

  React.useEffect(() => {
    CardApi.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log('Ошибка в получении карточки');
        console.error(err);
      });
  }, []);

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
