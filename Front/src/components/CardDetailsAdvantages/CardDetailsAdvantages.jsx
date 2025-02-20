import './CardDetailsAdvantages.css';

function CardDetailsAdvantages({ nameDetails, advantages }) {
  return (
    <>
      {advantages.length > 0 && (
        <section className='card-details__section'>
          <h2 className='card-details__title'>Преимущества {nameDetails}</h2>
          <ul className='card-details__advantages'>
            {advantages.map((advantage, index) => (
              <li key={index} className='card-details__advantage-item'>
                <div className='card-details__advantage-number'>
                  {index + 1}
                </div>
                <div className='card-details__advantage-content'>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default CardDetailsAdvantages;
