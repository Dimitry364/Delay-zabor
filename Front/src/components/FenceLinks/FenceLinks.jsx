import React from 'react';
import { Link } from 'react-router-dom';

function FenceLinks({
  ListClassName = '',
  linkClassName = '',
  cards = [],
  onClick,
}) {
  return (
    <>
      {cards.map((card) => (
        <li key={card._id} className={ListClassName}>
          <Link
            to={`/card/${card.slug}`}
            className={linkClassName}
            onClick={onClick}
            rel='noopener noreferrer'
          >
            {card.name}
          </Link>
        </li>
      ))}
    </>
  );
}

export default FenceLinks;
