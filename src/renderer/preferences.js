import Vue from 'vue';
import router from './preferences/router';
import store from './preferences/store';
import './preferences/i18n';

import Preferences from './preferences/Preferences';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Preferences)
}).$mount('#app');
