import React from 'react';
import { Link } from 'react-router-dom';

function FenceLinks({ ListClassName = '', linkClassName = '', cards = [] }) {
  return (
    <>
      {cards.map((card) => (
        <li key={card.id} className={ListClassName}>
          <Link
            to={`/card/${card.id}`}
            className={linkClassName}
            target='_blank'
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
