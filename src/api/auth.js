import config from '../../config';

export default {
  login: (credentials) =>
    fetch((config ? config.hostname : '/api') + '/user/authenticate', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText });
      }
      return res;
    }).then((res) => res.json()),
  signup: (credentials) =>
      fetch((config ? config.hostname : '/api') + '/user', {
        method: 'POST',
        body: JSON.stringify(credentials)
      }).then(res => {
        if (res.status !== 200) {
          return Promise.reject({ status: res.status, statusText: res.statusText });
        }
      })
};
