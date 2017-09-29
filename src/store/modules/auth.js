import * as types from '@/store/mutation-types';
import * as authApi from '@/api/auth';

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
  async login ({ commit, state }, credentials) {
    commit(types.LOGIN);
    try {
      const res = await authApi.login(credentials);
      window.localStorage.setItem('token', res.token);
      commit(types.LOGIN_SUCCESS, res);
    } catch (err) {
      commit(types.LOGIN_FAILURE);
      commit(types.SHOW_NOTIFICATION, err);
    }
  },
  async getUser ({ commit, state }) {
    if (localStorage.getItem('token')) {
      try {
        const res = await authApi.getUser();
        commit(types.UPDATE_USER, res);
      } catch (err) {
        commit(types.SHOW_NOTIFICATION, err);
      }
    } else {
      commit(types.REDIRECT_LOGIN);
    }
  },
  async patchRole ({ commit, state }, value) {
    if (localStorage.getItem('token')) {
      const userPatch = { roles: {}};
      userPatch.roles[value] = !state.user.roles[value];
      try {
        const res = await authApi.patchUser(userPatch);
        commit(types.UPDATE_USER, res);
      } catch (err) {
        commit(types.SHOW_NOTIFICATION, err);
      }
    }
  },
  logout ({ commit, state }) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    commit(types.LOGOUT);
  },
  async signup ({ dispatch, commit, state }, credentials) {
    try {
      const res = await authApi.signup(credentials);
      localStorage.setItem('token', res.token);
      commit(types.LOGIN_SUCCESS, res);
    } catch (err) {
      commit(types.SIGNUP_FAILURE);
      commit(types.SHOW_NOTIFICATION, err);
    }
  },
  async verify ({ commit, state }) {
    try {
      const verifiedUser = await authApi.verify();
      commit(types.UPDATE_USER, verifiedUser);
    } catch (err) {
      commit(types.SHOW_NOTIFICATION, err);
    }
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
