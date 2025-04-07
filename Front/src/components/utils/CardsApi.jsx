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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
  }

  getCardDetails(data) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 секунд

    return this._request(`${this._baseUrl}/cards/${data._id}`, {
      method: 'GET',
      headers: this._headers,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
  }
}

const cardApi = new CardApi({
  baseUrl: 'https://api.delaizabor-nsk.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default cardApi;
