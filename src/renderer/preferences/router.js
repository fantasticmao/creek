import Vue from 'vue';
import VueRouter from 'vue-router';
import {isNavigationFailure, NavigationFailureType} from 'vue-router/src/util/errors';

import DanmuDisplay from './DanmuDisplay';
import DanmuServer from './DanmuServer';
import AboutCreek from './AboutCreek';

// avoided redundant navigation to current location
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(error => {
    if (isNavigationFailure(error, NavigationFailureType.duplicated)) {
      // ignore exception
    } else {
      throw error;
    }
  });
};

Vue.use(VueRouter);

const routes = [{
  name: 'display', path: '/display', component: DanmuDisplay
}, {
  name: 'server', path: '/server', component: DanmuServer
}, {
  name: 'about', path: '/about', component: AboutCreek
}];

const router = new VueRouter({
  routes
});

export default router;
