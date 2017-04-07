import config from '../../config';

export default {
  login: (credentials) =>
    fetch(config.hostname + '/user/authenticate', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText });
      }
      return res;
    }).then((res) => res.json())
};
