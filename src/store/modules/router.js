import * as types from '../mutation-types';
import router from '../../router';

const state = {
};

const getters = {
};
const actions = {
};

const mutations = {
  [types.LOGIN_SUCCESS] (state) {
    router.push('/quests');
  },
  [types.LOGOUT] (state) {
    router.go('/');
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
