import * as types from '../mutation-types';
import quests from '../../api/quests';

const state = {
  quests: []
};

const getters = {
  activeQuests: state => {
    return state.quests.filter((q) => !q.completed);
  },
  questOffers: state => {
    return state.quests.filter((q) => q.type === 1);
  },
  completedQuests: state => {
    return state.quests.filter((q) => q.completed);
  },
  quests: state => {
    return state.quests.filter((q) => q.progress !== undefined)
                      .sort((q, q2) => q2.progress / q2.goal - q.progress / q.goal);
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
    return await quests.getQuests()
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
