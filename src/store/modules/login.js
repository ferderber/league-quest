import * as types from '../mutation-types';
import auth from '../../api/auth';

const state = {
  isLoggedIn: false
};

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn;
  }
};
const actions = {
  login ({ commit, state }, credentials) {
    commit(types.LOGIN);
    return auth.login(credentials)
        .then(() => commit(types.LOGIN_SUCCESS))
        .catch((err) => commit(types.LOGIN_FAILURE, err));
  },
  logout ({ commit }) {
    window.localStorage.removeItem('token');
    commit(types.LOGOUT);
  }
};

const mutations = {
  [types.LOGIN] (state) {
    state.pending = true;
  },
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true;
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false;
  },
  [types.LOGIN_FAILURE] (state) {

  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
