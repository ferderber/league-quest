import Vue from 'vue';
import App from '@/components/App';
import VueMaterial from 'vue-material';
import { sync } from 'vuex-router-sync';
import store from '@/store/store.js';
import router from '@/router';
require('vue-material/dist/vue-material.css');

sync(store, router);

Vue.use(VueMaterial);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
