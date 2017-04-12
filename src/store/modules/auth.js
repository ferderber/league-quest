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
    return auth.login(credentials)
          .then(() => commit(types.LOGIN_SUCCESS))
          .catch((err) => {
            commit(types.LOGIN_FAILURE);
            commit(types.SHOW_NOTIFICATION, err);
          });
  },
  logout ({ commit, state }) {
    commit(types.LOGOUT);
  },
  signup ({ dispatch, commit, state }, credentials) {
    return auth.signup(credentials)
        .then((user) => commit(types.LOGIN_SUCCESS, user))
        .catch((err) => {
          commit(types.SIGNUP_FAILURE);
          commit(types.SHOW_NOTIFICATION, err);
        });
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
  },
  [types.SIGNUP_FAILURE] (state) {

  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
