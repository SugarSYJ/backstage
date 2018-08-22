import Vue from 'vue';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './assets/common/common.scss';

import App from './App.vue';
import router from './router/router';
import store from './vuex/store';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
