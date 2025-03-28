class ReviewApi {
  constructor(options) {
    this._baseUrl = options.baseUrl; // исправлено имя свойства
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json(); // вызываем res.json()
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialReviews() {
    return this._request(`${this._baseUrl}/reviews`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  addReview({ name, text }) {
    return this._request(`${this._baseUrl}/reviews`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, text }),
    });
  }
}

const reviewApi = new ReviewApi({
  baseUrl: 'http://localhost:7007',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default reviewApi;
