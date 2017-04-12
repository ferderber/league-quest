import * as types from '../mutation-types';
import auth from '../../api/auth';

const state = {
  isLoggedIn: false,
  pending: true
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  pending: state => state.pending
};
const actions = {
  login ({ dispatch, commit, state }, credentials) {
    commit(types.LOGIN);
    auth.login(credentials)
        .then(() => commit(types.LOGIN_SUCCESS))
        .catch((err) => {
          commit(types.LOGIN_FAILURE);
          commit(types.SHOW_NOTIFICATION, err);
          dispatch('showNotification');
          return;
        });
  },
  logout ({ commit }) {
    commit(types.LOGOUT);
  }
};

const mutations = {
  [types.LOGIN] (state) {
    state.pending = true;
  },
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true;
    state.pending = false;
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false;
    state.pending = false;
  },
  [types.LOGIN_FAILURE] (state) {
    state.isLoggedIn = false;
    state.pending = false;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
