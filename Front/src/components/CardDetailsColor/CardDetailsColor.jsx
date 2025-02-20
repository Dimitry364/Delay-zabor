import './CardDetailsColor.css';

function CardDetailsColor({ colors }) {
  // Преобразуем объект colors в массив пар [colorName, hexValue]
  const colorEntries = Object.entries(colors);
  return (
    <>
      {colorEntries.length > 0 && (
        <section className='card-details__section'>
          <h2 className='card-details__title'>Доступные цвета</h2>
          <ul className='card-details__colors'>
            {colorEntries.map(([colorName, hexValue], index) => (
              <li key={index} className='card-details__color-item'>
                <div
                  className='card-details__color-square'
                  style={{ backgroundColor: hexValue }}
                ></div>
                <div className='card-details__color-name'>{colorName}</div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default CardDetailsColor;
