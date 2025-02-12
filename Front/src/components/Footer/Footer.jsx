import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <h3 className='footer__title'>ТрансСтрой</h3>
      <div className='footer__container'>
        <p className='footer__copyright'>&copy; 2024</p>

        <nav className='footer__nav'>
          <ul className='footer__nav-list'>
            <li className='footer__nav-item'>
              <a
                className='footer__nav-link'
                href='https://ya.ru'
                target='_blank'
                rel='noreferrer'
              >
                Яндекс
              </a>
            </li>
            <li className='footer__nav-item'>
              <a
                className='footer__nav-link'
                href='https://t.me/PoedimSalo'
                target='_blank'
                rel='noreferrer'
              >
                telegram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
