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
    addQuest({ commit, state }, quest) {
        quests.addQuest(quest)
            .then(() => commit(types.ACCEPT_QUEST))
            .catch(() => commit(types.API_ERROR))
    },
    reloadQuests({ commit, state }) {
        quests.getQuests()
            .then((quests) => commit(types.ACCEPT_QUEST, { quests }))
            .catch(() => commit(types.API_ERROR));
    }
};
const mutations = {
    [types.ACCEPT_QUEST](state) {
        state.pending = true;
    },
    [types.RELOADED_QUESTS](state) {
        state.isLoggedIn = true;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};