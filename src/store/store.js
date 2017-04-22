import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import quests from './modules/quests';
import router from './modules/router';
import notification from './modules/notification';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    router,
    notification,
    quests
  },
  strict: debug
});
