import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WorkList from '../WorkList/WorkList';
import CardApi from '../utils/CardsApi';
import ImagePopup from '../ImagePopup/ImagePopup';
import Loader from '../Loader/Loader';
import CardError from '../CardError/CardError';
import './OurWorks.css';

function OurWorks() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

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

  const displayedImages = images.slice(0, 6);

  const handlePopupOpen = (card) => {
    setSelectedImage(card);
  };

  const handlePopupClose = () => {
    setSelectedImage(null);
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
    <section className='our-works'>
      <h2 className='our-works__title'>Наши работы</h2>
      <WorkList images={displayedImages} popupOpen={handlePopupOpen} />
      <Link to='/gallery' className='our-works__button'>
        Смотреть все
      </Link>
      <ImagePopup
        card={selectedImage}
        onClose={handlePopupClose}
        onCloseClickOverlay={handlePopupCloseClickByOverlay}
      />
    </section>
  );
}

export default OurWorks;
