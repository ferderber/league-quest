import * as types from '../mutation-types';
import auth from '../../api/auth';

const localStorage = localStorage || { getItem: () => false, removeItem: () => null, setItem: () => null }; // If localStorage isn't defined set it (For test purposes)

const state = {
  isLoggedIn: !!localStorage.getItem('token'),
  pending: true,
  token: localStorage.getItem('token'),
  user: null
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  pending: state => state.pending,
  user: state => state.user,
  token: state => state.token
};
const actions = {
  login ({ dispatch, commit, state }, credentials) {
    commit(types.LOGIN);
    return auth.login(credentials)
          .then((user) => {
            localStorage.setItem('token', user.token);
            commit(types.LOGIN_SUCCESS, user);
          })
          .catch((err) => {
            commit(types.LOGIN_FAILURE);
            commit(types.SHOW_NOTIFICATION, err);
          });
  },
  logout ({ commit, state }) {
    localStorage.removeItem('token');
    commit(types.LOGOUT);
  },
  signup ({ dispatch, commit, state }, credentials) {
    return auth.signup(credentials)
        .then((user) => { localStorage.setItem('token', user.token); commit(types.LOGIN_SUCCESS, user); })
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
  [types.LOGIN_SUCCESS] (state, user) {
    state.isLoggedIn = true;
    state.pending = false;
    state.user = user;
    state.token = user.token;
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
