import * as types from '@/store/mutation-types';

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
    state.message = err.message || err;
  },
  [types.HIDE_NOTIFICATION] (state, err) {
    state.message = null;
  },
  [types.API_ERROR] (state, err) {
    state.message = err.message || err;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
