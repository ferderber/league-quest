import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import quests from './modules/quests';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    login,
    quests
  },
  strict: debug
});
