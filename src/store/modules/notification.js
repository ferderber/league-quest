import * as types from '../mutation-types';

const state = {
  message: null
};

const getters = {
  isError: state => state.message !== null,
  message: state => state.message
};
const actions = {
  hideNotification ({ commit }) {
    commit(types.HIDE_NOTIFICATION);
  }
};

const mutations = {
  [types.SHOW_NOTIFICATION] (state, err) {
    state.message = err.statusText;
  },
  [types.HIDE_NOTIFICATION] (state, err) {
    state.message = null;
  },
  [types.API_ERROR] (state, err) {
    state.message = err.statusText;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
