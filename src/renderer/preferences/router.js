import Vue from 'vue';
import VueRouter from "vue-router";

import DanmuDisplay from "./DanmuDisplay";
import DanmuServer from "./DanmuServer";
import AboutCreek from "./AboutCreek";

Vue.use(VueRouter);

const routes = [{
  name: 'danmuDisplay', path: '/danmuDisplay', component: DanmuDisplay
}, {
  name: 'danmuServer', path: '/danmuServer', component: DanmuServer
}, {
  name: 'aboutCreek', path: '/aboutCreek', component: AboutCreek
}];

const router = new VueRouter({
  routes
});

export default router;
