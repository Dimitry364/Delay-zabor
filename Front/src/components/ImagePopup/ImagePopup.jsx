import './ImagePopup.css';

function ImagePopup({ card, onCloseClickOverlay, onClose }) {
  return (
    <div
      className={`popup popup_photos_background ${card && 'popup_opened'}`}
      id='popup-photos'
      onClick={onCloseClickOverlay}
    >
      <div className='popup__photos-container'>
        <img
          className='popup__image'
          src={card && card.image}
          alt={card && card.name}
        />
        <p className='popup__photos-title'>{card && card.name}</p>
        <button
          className='popup__cancel-button'
          type='button'
          title='Закрыть'
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
