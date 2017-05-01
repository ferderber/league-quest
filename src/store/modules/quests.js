import * as types from '../mutation-types';
import quests from '../../api/quests';

const state = {
  quests: []
};

function objectiveComparator (acc, obj) {
  acc += obj.progress / obj.goal;
}

const getters = {
  activeQuests: state => {
    return state.quests.filter((q) => q.active);
  },
  questOffers: state => {
    return state.quests.filter((q) => !q.active);
  },
  completedQuests: state => {
    return state.quests.filter((q) => q.completed);
  },
  quests: state => {
    return state.quests.concat()
      .sort((q, q2) => (q2.objectives.reduce(objectiveComparator) / q2.objectives.length) - (q.objectives.reduce(objectiveComparator) / q.objectives.length));
  }
};

const actions = {
  async acceptQuest ({ commit, state }, quest) {
    return await quests.acceptQuest(quest)
      .then((quest) => commit(types.ACCEPT_QUEST, quest))
      .catch((err) => {
        commit(types.API_ERROR, err);
      });
  },
  async getQuests ({ commit, state }) {
    if (localStorage.getItem('token')) {
      return await quests.getQuests()
      .then((quests) => commit(types.UPDATE_QUESTS, quests))
      .catch((err) => {
        commit(types.API_ERROR, err);
      });
    } else {
      commit(types.REDIRECT_LOGIN);
    }
  },
  async updateQuests ({ commit, state }) {
    return await quests.updateQuests()
      .then((quests) => commit(types.UPDATE_QUESTS, quests))
      .catch((err) => {
        commit(types.API_ERROR, err);
      });
  }
};

const mutations = {
  [types.ACCEPT_QUEST] (state, quest) {
    state.quests.push(quest);
  },
  [types.UPDATE_QUESTS] (state, quests) {
    state.quests = quests;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
