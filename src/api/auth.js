var headers = { 'Content-Type': 'application/json' };

export default {
  login: (credentials) =>
    fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user/authenticate', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(credentials)
    }).then(res => {
      if (res.status !== 200) {
        return res.json().then(json => Promise.reject({ status: res.status, statusText: res.statusText, message: json.message }));
      }
      return res;
    }).then(res => res.json()),
  signup: (credentials) => {
    return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(credentials)
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText, message: res.message });
      }
      return res;
    }).then(res => res.json());
  }
};
