import * as types from '@/store/mutation-types';
import * as questApi from '@/api/quests';

const state = {
  quests: []
};

function objectiveComparator (acc, obj) {
  acc += obj.progress / obj.goal;
}

const getters = {
  activeQuests: state => {
    return state.quests.filter((q) => q.active && !q.completed);
  },
  questOffers: state => {
    return state.quests.filter((q) => !q.active);
  },
  completedQuests: state => {
    return state.quests.filter((q) => q.completed).sort((q1, q2) => q1.title.localeCompare(q2.title));
  },
  quests: state => {
    return state.quests.concat()
      .sort((q, q2) => (q2.objectives.reduce(objectiveComparator) / q2.objectives.length) - (q.objectives.reduce(objectiveComparator) / q.objectives.length));
  }
};

const actions = {
  async acceptQuest ({ commit, dispatch, state }, quest) {
    try {
      const res = await questApi.acceptQuest(quest);
      commit(types.ACCEPT_QUEST, res);
      dispatch('getQuestOffers');
    } catch (err) {
      commit(types.API_ERROR, err);
    }
  },
  async getQuests ({ commit, dispatch, state }) {
    if (localStorage.getItem('token')) {
      try {
        const quests = await questApi.getQuests();
        commit(types.UPDATE_QUESTS, quests);
      } catch (err) {
        commit(types.API_ERROR, err);
      }
    } else {
      commit(types.REDIRECT_LOGIN);
    }
  },
  async updateQuests ({ commit, state }) {
    try {
      const quests = await questApi.updateQuests();
      commit(types.UPDATE_QUESTS, quests);
    } catch (err) {
      commit(types.API_ERROR, err);
    }
  },
  async getQuestOffers ({ commit, state }) {
    try {
      const questOffers = await questApi.getQuestOffers();
      commit(types.ADD_QUEST_OFFERS, questOffers);
    } catch (err) {
      commit(types.API_ERROR, err);
    }
  }
};

const mutations = {
  [types.ACCEPT_QUEST] (state, quest) {
    state.quests = state.quests.filter((q) => q.active);
    state.quests.push(quest);
  },
  [types.UPDATE_QUESTS] (state, quests) {
    state.quests = quests;
  },
  [types.ADD_QUEST_OFFERS] (state, quests) {
    state.quests = state.quests.concat(quests);
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
