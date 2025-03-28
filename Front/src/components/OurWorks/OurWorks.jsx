import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import WorkList from '../WorkList/WorkList';
import ImagePopup from '../ImagePopup/ImagePopup';
import { CardsContext } from '../Context/CardsContext';
import './OurWorks.css';

function OurWorks() {
  const { cards } = useContext(CardsContext);

  const displayedCards = cards.slice(0, 6);

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

  return (
    <section className='our-works'>
      <h2 className='our-works__title'>Наши работы</h2>
      <WorkList cards={displayedCards} popupOpen={handlePopupOpen} />
      <Link to='/gallery' className='our-works__button'>
        Смотреть все
      </Link>
      <ImagePopup
        card={selectedCard}
        onClose={handlePopupClose}
        onCloseClickOverlay={handlePopupCloseClickByOverlay}
      />
    </section>
  );
}

export default OurWorks;
