class QueryApi {
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

  registerQuery(email, companyName, fullName, phoneNumber, address) {
    return this._request(`${this._baseUrl}/Query/query`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        companyName: companyName,
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        email: email,
      }),
    });
  }
}

const queryApi = new QueryApi({
  baseUrl: 'http://localhost:7007',
  // baseUrl: 'https://192.168.0.11:7007',
  headers: {
    accept: '*',
    'Content-Type': 'application/json',
  },
});

export default queryApi;
