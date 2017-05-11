var headers = { 'Content-Type': 'application/json' };

export default {
  login: (credentials) =>
    fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user/authenticate', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(credentials)
    }).catch(() => Promise.reject({ message: 'Server is not responding' }))
      .then(res => {
        if (res.status !== 200) {
          return res.json()
            .then(json => Promise.reject({ status: res.status, statusText: res.statusText, message: json.message }));
        }
        return res;
      }).then(res => res.json()),
  signup: (credentials) =>
    fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(credentials)
    }).catch(() => Promise.reject({ message: 'Server is not responding' }))
      .then(res => {
        if (res.status !== 200) {
          return res.json()
            .then(json => Promise.reject({ status: res.status, statusText: res.statusText, message: json.message }));
        }
        return res;
      }).then(res => res.json()),
  getUser: () =>
    fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).catch(() => Promise.reject({ message: 'Server is not responding' }))
      .then(res => {
        if (res.status !== 200) {
          return res.json()
            .then(json => Promise.reject({ status: res.status, statusText: res.statusText, message: json.message }));
        }
        return res;
      }).then(res => res.json()),
  getStats: () =>
    fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user/stats/100', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).catch(() => Promise.reject({ message: 'Server is not responding' }))
      .then(res => {
        if (res.status !== 200) {
          return res.json()
            .then(json => Promise.reject({ status: res.status, statusText: res.statusText, message: json.message }));
        }
        return res;
      }).then(res => res.json()),
  patchUser: (userPatch) =>
    fetch(`${process.env.API_URL ? process.env.API_URL : '/api'}/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(userPatch)
    }).catch(() => Promise.reject({ message: 'Server is not responding' }))
      .then(res => {
        if (res.status !== 200) {
          return res.json()
            .then(json => Promise.reject({ status: res.status, statusText: res.statusText, message: json.message }));
        }
        return res;
      }).then(res => res.json())
};
