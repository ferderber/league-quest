export default {
  acceptQuest: (quest) =>
    fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/quest/' + quest.id + '/accept', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).catch(() => Promise.reject({ message: 'Server is not responding' }))
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText });
      }
      return res;
    }).then((res) => res.json()),

  getQuests: () =>
    fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/quest', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).catch(() => Promise.reject({ message: 'Server is not responding' }))
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText });
      }
      return res;
    }).then((res) => res.json()),
  updateQuests: () =>
    fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/quest/update', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).catch(() => Promise.reject({ message: 'Server is not responding' }))
    .then((res) => {
      if (res) {
        if (res.status !== 200) {
          return Promise.reject({ status: res.status, statusText: res.statusText });
        }
        return res;
      }
    }).then((res) => res.json())
};
