import './CardDetailsGate.css';

function CardDetailsGate({ gateNames, popupOpen }) {
  return (
    <>
      {gateNames.length > 0 && (
        <section className='card-details__section'>
          <h2 className='card-details__title'>Виды ворот</h2>
          <div className='card-details__gates'>
            {gateNames.map((gate, index) => (
              <div key={index} className='card-details__gate-item'>
                <img className='card-details__gate-img'
                  src={gate.image}
                  alt={gate.name}
                  onClick={() => popupOpen(gate)}
                ></img>
                <p className='card-details__gate-name'>{gate.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default CardDetailsGate;
