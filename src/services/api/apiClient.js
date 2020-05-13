import ApiError from './apiError';

export default class ApiClient {
  #prefix = '';
  #token = localStorage.getItem('__auth_token__');
  constructor({ prefix = 'http://localhost' } = {}) {
    this.#prefix = prefix;
  };

  getToken() {
    return this.#token;
  };

  setToken(token, rememberMe = false) {
    this.#token = token;
    if (rememberMe) {
      localStorage.setItem('__auth_token__', token);
    } else {
      localStorage.removeItem('__auth_token__');
    };
  };

  get(requestUrl = '/', query = {}, headers = {}) {
    return this.request({
      url: requestUrl,
      method: 'GET',
      query, headers
    });
  };

  put(requestUrl = '/', payload = {}, headers = {}) {
    return this.request({
      url: requestUrl,
      method: 'PUT',
      body: payload,
      headers
    });
  };

  patch(requestUrl = '/', payload = {}, headers = {}) {
    return this.request({
      url: requestUrl,
      method: 'PATCH',
      body: payload,
      headers
    });
  };

  post(requestUrl = '/', payload = {}, headers = {}) {
    return this.request({
      url: requestUrl,
      method: 'POST',
      body: payload,
      headers
    });
  };

  delete(requestUrl = '/', headers = {}) {
    return this.request({
      url: requestUrl,
      method: 'DELETE',
      headers
    });
  };

  request({ url, method, body, query, headers }) {
    if (url[0] === '/') url = url.substr(1);

    let fetchInit = {
      method,
      headers: {
        Accept: 'application/json'
      }
    };

    // Add Headers
    if (method !== 'GET' && !(body instanceof FormData)) {
      fetchInit.headers['Content-Type'] = 'application/json';
    };
    for (let headerName in headers) {
      fetchInit.headers[headerName] = headers[headerName];
    };

    // Add Query
    let queryString = '';
    if (typeof query === 'object' && Object.keys(query).length) {
      queryString = '?';
      for (let key in query) {
        if (Array.isArray(query[key])) {
          queryString += query[key].reduce(
            (accum, item) => (accum += `${key}=${item}&`),
            ''
          );
        } else queryString += `${key}=${query[key]}&`;
      };
      queryString = queryString.substr(0, queryString.length - 1);
    };

    // Add Body
    if (method !== 'GET' && method !== 'HEAD') {
      fetchInit.body = body instanceof FormData ? body : JSON.stringify(body);
    };

    // Fetch data
    if (process.env.NODE_ENV === 'development') console.log(method, `${this.#prefix}/${url}${queryString}`);
    let responseStatus, responseHeaders;
    return fetch(`${this.#prefix}/${url}${queryString}`, fetchInit)
      .then(res => {
        responseHeaders = res.headers;
        responseStatus = res.status;
        if (res.status === 204) return null
        else return res.json();
      })
      .then(data => {
        if (responseStatus >= 400) throw new ApiError(responseStatus, data.type);
        return {
          response: data,
          headers: responseHeaders,
          status: responseStatus
        };
      })
  };
};
