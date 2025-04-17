// src/utils/CmsApi.js
class CmsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      ...options,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getPromo() {
    return this._request('/promos?populate=image');
  }

  getSteps() {
    return this._request('/steps?populate=icon');
  }

  getPromoSteps() {
    return this._request('/promosteps?populate=icon&sort=order');
  }

  getSeoBySlug(slug) {
    return this._request(`/seos?filters[slug][$eq]=${slug}&populate=og_image`);
  }
}

const cmsApi = new CmsApi({
  baseUrl: 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default cmsApi;
