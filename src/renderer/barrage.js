import Vue from 'vue';
import Barrage from './barrage/Barrage';
import {vueBaberrage} from 'vue-baberrage';

Vue.config.productionTip = false;
Vue.use(vueBaberrage);

new Vue({
  render: h => h(Barrage)
}).$mount('#app');
