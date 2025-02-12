import React from 'react';
import { Link } from 'react-router-dom';
import './Promo.css';
import consultation from '../../images/promo/Group-2.png';
import measuring from '../../images/promo/Group-3.png';
import brigade from '../../images/promo/Group.png';
import acceptance from '../../images/promo/Group-1.png';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__content'>
          <div className='promo__info'>
            <div className='promo__title-wrapper'>
              <h1 className='promo__title'>
                Изготовление <br />
                заборов под ключ
              </h1>
              <div className='promo__query'>
                <h2 className='promo__subtitle'>
                  В Новосибирске <br />и Новосибирской области
                </h2>
                <button className='promo__button-query'>Оставить заявку</button>
              </div>
            </div>
          </div>
          <div className='promo__list-container'>
            <ul className='promo__list'>
              <li className='promo__list-item'>
                <Link to='/profile-pipe' className='promo__link'>
                  из профтрубы
                </Link>
              </li>
              <li className='promo__list-item'>
                <Link to='/profile-sheet' className='promo__link'>
                  из профнастила
                </Link>
              </li>
              <li className='promo__list-item'>
                <Link to='/chain-link-fence' className='promo__link'>
                  из сетки рабица
                </Link>
              </li>
              <li className='promo__list-item'>
                <Link to='/forged-fence' className='promo__link'>
                  забор ковкой
                </Link>
              </li>
              <li className='promo__list-item'>
                <Link to='/3d-fence' className='promo__link'>
                  забор 3D
                </Link>
              </li>
              <li className='promo__list-item'>
                <Link to='/polycarbonate-fence' className='promo__link'>
                  из поликарбоната
                </Link>
              </li>
              <li className='promo__list-item'>
                <Link to='/euro-shtaketnik' className='promo__link'>
                  из евроштакетника
                </Link>
              </li>
              <li className='promo__list-item'>
                <Link to='/turnkey' className='promo__link'>
                  под ключ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='promo__image' title='Изображение забора'></div>

        {/* Новый блок "Этапы работы" */}
        <div className='promo__steps'>
          <h2 className='promo__steps-title'>Этапы работы</h2>
          <ul className='promo__steps-list'>
            <li className='promo__steps-item'>
              <img
                src={consultation}
                alt='Консультация'
                className='promo__steps-icon'
              />
              <strong className='promo__steps-strong'>Консультация</strong>
              <p className='promo__steps-paragraph'>
                Подберем решение&nbsp;под ваши
                <br />
                потребности,&nbsp;расскажем
                <br />
                подробности,&nbsp;посчитаем
                <br />
                итоговую стоимость.
              </p>
            </li>
            <li className='promo__steps-item'>
              <img src={measuring} alt='Замер' className='promo__steps-icon' />
              <strong className='promo__steps-strong'>Замер</strong>
              <p className='promo__steps-paragraph'>
                Произведем замеры, <br />
                составим смету и&nbsp;оформим <br />
                договор.
              </p>
            </li>
            <li className='promo__steps-item'>
              <img src={brigade} alt='Монтаж' className='promo__steps-icon' />
              <strong className='promo__steps-strong'>Монтаж</strong>
              <p className='promo__steps-paragraph'>
                Бригада профессионалов
                <br />
                возведет забор вокруг участка
                <br />
                в&nbsp;установленные сроки.
              </p>
            </li>
            <li className='promo__steps-item'>
              <img
                src={acceptance}
                alt='Прием работ'
                className='promo__steps-icon'
              />
              <strong className='promo__steps-strong'>Прием работ</strong>
              <p className='promo__steps-paragraph'>
                Производим финишные
                <br />
                работы и&nbsp;уборку территории.
                <br />
                Ваш забор готов!
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Promo;
