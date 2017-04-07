import config from '../../config';

export default {
  acceptQuest: (quest) =>
    fetch(config.hostname + '/quests/' + quest + '/accept', {
      method: 'POST'
    }).then((res) => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText });
      }
      return res;
    }).then((res) => res.json()),

  getQuests: () =>
    fetch(config.hostname + '/quests', {
      method: 'GET'
    }).then((res) => {
      if (res.status !== 200) {
        return Promise.reject({ status: res.status, statusText: res.statusText });
      }
      return res;
    }).then((res) => res.json())
};
