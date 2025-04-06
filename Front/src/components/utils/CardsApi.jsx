class CardApi {
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

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  getCardDetails(data) {
    return this._request(`${this._baseUrl}/cards/${data._id}`, {
      method: 'GET',
      headers: this._headers,
    });
  }
}

const cardApi = new CardApi({
  baseUrl: 'http://api.delaizabor-nsk.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default cardApi;
