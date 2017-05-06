import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import quests from './modules/quests';
import router from './modules/router';
import leaderboard from './modules/leaderboard';
import notification from './modules/notification';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    router,
    notification,
    leaderboard,
    quests
  },
  strict: debug
});
