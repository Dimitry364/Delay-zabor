class OrderFormApi {
  constructor(options) {
    // Сохраняем базовый URL и заголовки, которые будут использоваться во всех запросах
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Метод для проверки ответа сервера. Если запрос успешный (res.ok === true),
  // то преобразуем ответ в JSON, иначе отклоняем промис с сообщением об ошибке.
  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Универсальный метод для отправки запроса с заданным URL и опциями.
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Метод для регистрации заказа (отправки данных формы).
  // Принимает имя и номер телефона, формирует тело запроса и отправляет его.
  registerOrder(name, phone) {
    return this._request(`${this._baseUrl}/order`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        phone: phone,
      }),
    });
  }
}

// Создаём экземпляр API с нужными параметрами: базовый URL и заголовки.
const orderFormApi = new OrderFormApi({
  baseUrl: 'https://api.delaizabor-nsk.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default orderFormApi;
