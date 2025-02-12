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
  baseUrl: 'http://localhost:7007',
  // baseUrl: 'https://192.168.0.11:7007',
  headers: {
    accept: '*',
    // Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});

export default cardApi;
