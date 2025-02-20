import React from 'react';
import './CardDetailsFAQ.css';

const CardDetailsFAQ = ({ faq, openFaq, toggleFaq, faqRefs }) => {
  return (
    <>
      {faq.length > 0 && (
        <section className='card-details__section'>
          <h2 className='card-details__title'>Часто задаваемые вопросы</h2>
          <div className='card-details__faq'>
            {faq.map((item, index) => (
              <div key={index} className='card-details__faq-item'>
                <div
                  className='card-details__faq-question'
                  onClick={() => toggleFaq(index)}
                >
                  <h4>{item.question}</h4>
                  <button className='card-details__faq-toggle'>
                    {openFaq === index ? '-' : '+'}
                  </button>
                </div>
                {/* Контейнер ответа всегда рендерится, чтобы CSS-анимация работала */}
                <div
                  ref={(el) => (faqRefs.current[index] = el)}
                  className='card-details__faq-answer'
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default CardDetailsFAQ;
