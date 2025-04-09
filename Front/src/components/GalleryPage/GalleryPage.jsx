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
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    CardApi.getOurWorksImages()
      .then((data) => {
        setImages(data);
      })
      .catch((err) => {
        setError('Ошибка загрузки галереи, попробуйте презагрузить страницу');
        console.log('Ошибка в получении галереи');
        console.error(err);
      });
  }, []);

  const handlePopupOpen = (imageUrl) => {
    setSelectedCard({ image: imageUrl });
  };

  const handlePopupClose = () => {
    setSelectedCard(null);
  };

  const handlePopupCloseClickByOverlay = (e) => {
    if (e.target.classList.contains('popup')) {
      handlePopupClose();
    }
  };

  if (error) {
    return (
      <CardError message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (!images.length) {
    return <Loader />;
  }

  return (
    <div className='gallery'>
      <div className='gallery__container'>
        <h1 className='gallery__title'>Наши работы</h1>
        <WorkList images={images} popupOpen={handlePopupOpen} />
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
