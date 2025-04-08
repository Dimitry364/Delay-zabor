import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CardApi from '../utils/CardsApi';
import ImagePopup from '../ImagePopup/ImagePopup';
import CardDetailsImage from '../CardDetailsImage/CardDetailsImage';
import CardDetailsInfo from '../CardDetailsInfo/CardDetailsInfo';
import CardDetailsColor from '../CardDetailsColor/CardDetailsColor';
import CardDetailsGate from '../CardDetailsGate/CardDetailsGate';
import CardDetailsAdvantages from '../CardDetailsAdvantages/CardDetailsAdvantages';
import CardDetailsFAQ from '../CardDetailsFAQ/CardDetailsFAQ';
import './CardDetails.css';
import CardError from '../CardError/CardError';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

function CardDetails() {
  const { slug } = useParams(); // Получаем IdSlug из URL
  const { pathname } = useLocation();
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Состояние для открытого FAQ: храним индекс открытого вопроса или null (если ни один не открыт)
  const [openFaq, setOpenFaq] = useState(null);

  // Массив рефов для хранения ссылок на контейнеры ответов FAQ
  const faqRefs = useRef([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  // Загружаем данные карточки по slug
  useEffect(() => {
    if (!slug) {
      setError('Некорректный IDSlug карточки');
      setLoading(false);
      return;
    }

    // Сбрасываем перед новым запросом
    setCard(null);
    setError(null);
    setLoading(true);

    CardApi.getCardDetails({ slug })
      .then((cardData) => {
        setCard(cardData);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.warn('Превышено время ожидания ответа');
          setError(
            'Сервер долго не отвечает, попробуйте перезагрузить страницу'
          );
          return;
        } else {
          setError('Карточка не найдена');
          console.error('Ошибка в получении карточки', err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // Эффект для анимации FAQ: обновляем высоту контейнера ответа
  useEffect(() => {
    // Если карточка ещё не загружена, выходим
    if (!card) return;
    faqRefs.current.forEach((element, index) => {
      if (element) {
        element.style.height =
          openFaq === index ? `${element.scrollHeight}px` : '0px';
      }
    });
  }, [openFaq, card]);

  // Функция переключения FAQ: если кликнули по уже открытому, закрываем его, иначе открываем новый
  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Функция открытия popup. При клике передаём объект карточки.
  const handlePopupOpen = (card) => {
    setSelectedCard(card);
  };

  // Функция закрытия popup
  const handlePopupClose = () => {
    setSelectedCard(null);
  };

  // Закрытие popup при клике на overlay
  function handlePopupCloseClickByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      handlePopupClose();
    }
  }

  if (error) {
    return (
      <CardError message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (loading) {
    return <CardSkeleton />;
  }

  // Деструктуризация данных карточки
  const {
    name,
    nameDetails,
    image,
    installation_price,
    turnkey_price,
    specifications = {},
    colors = {},
    gate_names = [],
    advantages = [],
    faq = [],
  } = card;

  return (
    <div className='card-details'>
      <div className='card-details__container'>
        <div className='card-details__content'>
          {/* Блок с изображением карточки */}
          <CardDetailsImage
            popupOpen={() => handlePopupOpen(card)}
            name={name}
            image={image}
          />

          {/* Информационный блок */}
          <CardDetailsInfo
            nameDetails={nameDetails}
            installation_price={installation_price}
            turnkey_price={turnkey_price}
            specifications={specifications}
          />
        </div>

        {/* Список доступных цветов */}
        <CardDetailsColor colors={colors} />

        {/* Типы ворот */}
        <CardDetailsGate popupOpen={handlePopupOpen} gateNames={gate_names} />

        {/* Преимущества */}
        <CardDetailsAdvantages advantages={advantages} />

        {/* FAQ с аккордеоном */}
        <CardDetailsFAQ
          faq={faq}
          openFaq={openFaq}
          toggleFaq={toggleFaq}
          faqRefs={faqRefs}
        />
      </div>
      {/* Popup для отображения изображения карточки */}
      <ImagePopup
        card={selectedCard}
        onClose={handlePopupClose}
        onCloseClickOverlay={handlePopupCloseClickByOverlay}
      />
    </div>
  );
}

export default CardDetails;
