import config from '../../config';

export default {
  acceptQuest: (quest) =>
    fetch((config ? config.hostname : '/api') + '/quests/' + quest + '/accept', {
      method: 'POST'
    }).then((res) => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText });
      }
      return res;
    }).then((res) => res.json()),

  getQuests: () =>
    fetch((config ? config.hostname : '/api') + '/quests', {
      method: 'GET'
    }).then((res) => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText });
      }
      return res;
    }).then((res) => res.json())
};
