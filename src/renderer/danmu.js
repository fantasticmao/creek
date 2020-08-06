import Vue from 'vue';
import Danmu from './danmu/Danmu';
import {vueBaberrage} from 'vue-baberrage';

Vue.config.productionTip = false;
Vue.use(vueBaberrage);

new Vue({
  render: h => h(Danmu)
}).$mount('#app');
