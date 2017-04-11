import * as types from '../mutation-types';

const state = {
  message: null
};

const getters = {
  isError: state => state.message !== null,
  message: state => state.message
};
const actions = {
  showNotification ({ dispatch, commit, state }) {
    setTimeout(() => {
      commit(types.HIDE_NOTIFICATION);
    }, 2500);
  }
};

const mutations = {
  [types.SHOW_NOTIFICATION] (state, err) {
    state.message = err.statusText;
  },
  [types.HIDE_NOTIFICATION] (state, err) {
    state.message = null;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
