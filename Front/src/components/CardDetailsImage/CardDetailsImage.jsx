import './CardDetailsImage.css';

function CardDetailsImage({ image, name, popupOpen }) {
  return (
    <div className='card-details__image-container'>
      <img
        className='card-details__image'
        src={image}
        alt={name}
        onClick={popupOpen}
      />
    </div>
  );
}

export default CardDetailsImage;
