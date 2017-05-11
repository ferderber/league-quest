import * as types from '../mutation-types';
import auth from '../../api/auth';

const state = {
  isLoggedIn: !!window.localStorage.getItem('token'),
  pending: true,
  token: window.localStorage.getItem('token'),
  user: null
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  pending: state => state.pending,
  user: state => state.user,
  token: state => state.token
};
const actions = {
  login ({ commit, state }, credentials) {
    commit(types.LOGIN);
    return auth.login(credentials)
      .then((res) => {
        window.localStorage.setItem('token', res.token);
        commit(types.LOGIN_SUCCESS, res);
      })
      .catch((err) => {
        commit(types.LOGIN_FAILURE);
        commit(types.SHOW_NOTIFICATION, err);
      });
  },
  getUser ({ commit, state }) {
    if (localStorage.getItem('token')) {
      return auth.getUser()
        .then((res) => {
          commit(types.UPDATE_USER, res);
        })
        .catch((err) => {
          commit(types.SHOW_NOTIFICATION, err);
        });
    } else {
      commit(types.REDIRECT_LOGIN);
    }
  },
  patchRole ({ commit, state }, value) {
    if (localStorage.getItem('token')) {
      const userPatch = { roles: {}};
      userPatch.roles[value] = !state.user.roles[value];
      return auth.patchUser(userPatch)
        .then((res) => {
          commit(types.UPDATE_USER, res);
        })
        .catch((err) => {
          commit(types.SHOW_NOTIFICATION, err);
        });
    }
  },
  logout ({ commit, state }) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    commit(types.LOGOUT);
  },
  signup ({ dispatch, commit, state }, credentials) {
    return auth.signup(credentials)
      .then((res) => { localStorage.setItem('token', res.token); commit(types.LOGIN_SUCCESS, res); })
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
  [types.LOGIN_SUCCESS] (state, res) {
    state.isLoggedIn = true;
    state.pending = false;
    state.user = res.user;
    state.token = res.token;
  },
  [types.UPDATE_USER] (state, user) {
    state.user = user;
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false;
    state.pending = false;
    state.user = null;
    state.token = null;
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
