import Vue from 'vue';
import router from './preferences/router';
import './preferences/i18n';

import Preferences from './preferences/Preferences';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(Preferences)
}).$mount('#app');
