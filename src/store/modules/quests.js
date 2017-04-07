import * as types from '../mutation-types';
import quests from '../../api/quests';

const state = {
  completedQuests: [],
  activeQuests: [],
  questOffers: []
};

const getters = {
  activeQuests: state => {
    return state.activeQuests;
  },
  questOffers: state => {
    return state.questOffers;
  },
  completedQuests: state => {
    return state.completedQuests;
  }
};
const actions = {
  acceptQuest ({ commit, state }, quest) {
    return quests.acceptQuest(quest)
        .then((quest) => commit(types.ACCEPT_QUEST, quest))
        .catch((err) => commit(types.API_ERROR, err));
  },
  getQuests ({ commit, state }) {
    return quests.getQuests()
        .then((quests) => commit(types.UPDATE_QUESTS, quests))
        .catch((err) => commit(types.API_ERROR, err));
  }
};
const mutations = {
  [types.ACCEPT_QUEST] (state, quest) {
    state.pending = true;
    state.activeQuests.push(quest);
  },
  [types.UPDATE_QUESTS] (state, quest) {
    state.isLoggedIn = true;
    state.activeQuests = quests;
    // Filter quests into arrays
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
