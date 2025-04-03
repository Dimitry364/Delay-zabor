import App from '../App/App';
import { CardsProvider } from '../Context/CardsContext';
import { OrderPopupProvider } from '../Context/OrderPopupContext';

function AppWrapper() {
  return (
    <CardsProvider>
      <OrderPopupProvider>
        <App />
      </OrderPopupProvider>
    </CardsProvider>
  );
}

export default AppWrapper;
