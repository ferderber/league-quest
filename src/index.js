import Vue from 'vue';
import App from 'components/App';
import VueResource from 'vue-resource';
import VueMaterial from 'vue-material';
require('vue-material/dist/vue-material.css');
import store from './store/store.js';
import router from './router';
// import { sync } from 'vuex-router-sync';

Vue.use(VueResource);
Vue.use(VueMaterial);
// sync(store, router);

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');


if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

