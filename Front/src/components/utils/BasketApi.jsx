class BasketApi {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, option) {
    return fetch(url, option).then(this._checkResponse);
  }

  // Метод создания корзины
  _createBasket() {
    return this._request(`${this._baseUrl}/api/Basket/basket`, {
      method: 'POST',
      headers: this._headers,
    }).then((data) => {
      localStorage.setItem('Basket', data.basketId); // Сохраняем basketId в localStorage
      return data.basketId;
    });
  }

  // Внутренний метод для отправки товара в корзину
  _addCardToBasket(basketId, cardId, count) {
    return this._request(`${this._baseUrl}/api/Basket/basket/addCard`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        basketId: basketId,
        _id: cardId,
        count: count,
      }),
    });
  }

  // Метод для добавления товара в корзину
  addCardInBasket(cardId, count) {
    let basketId = localStorage.getItem('Basket');

    // Проверяем, создана ли корзина
    if (!basketId) {
      return this._createBasket().then((newBasketId) => {
        return this._addCardToBasket(newBasketId, cardId, count);
      });
    } else {
      return this._addCardToBasket(basketId, cardId, count);
    }
  }

  getBasketItems() {
    let basketId = localStorage.getItem('Basket');

    if (!basketId) {
      return Promise.resolve([]);
    }

    return this._request(`${this._baseUrl}/api/Basket/basket/${basketId}`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  updateBasketItem(data) {
    return this._request(`${this._baseUrl}/api/Basket/basket/${data._id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ count: data.count }),
    });
  }

  deleteBasketItem(itemId) {
    return this._request(`${this._baseUrl}/api/Basket/basket/${itemId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
}

const basketApi = new BasketApi({
  baseUrl: 'http://localhost:7007',
  // baseUrl: 'https://192.168.0.11:7007',
  headers: {
    accept: '*',
    'Content-Type': 'application/json',
  },
});

export default basketApi;
