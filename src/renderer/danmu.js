import Vue from 'vue';
import store from "./danmu/store";

import Danmu from './danmu/Danmu';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Danmu)
}).$mount('#app');
