import * as types from '../mutation-types';
import auth from '../../api/auth';

const state = {
  isLoggedIn: false
};

const getters = {
  isLoggedIn: state => state.isLoggedIn
};
const actions = {
  login ({ dispatch, commit, state }, credentials) {
    commit(types.LOGIN);
    return new Promise((resolve, reject) =>
      resolve(auth.login(credentials)
        .then(() => commit(types.LOGIN_SUCCESS))
        .catch((err) => {
          commit(types.LOGIN_FAILURE, err);
          dispatch('showNotification');
          return reject();
        })
    ));
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
  [types.LOGIN_FAILURE] (state, err) {
    state.errorStatus = err.statusText;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
