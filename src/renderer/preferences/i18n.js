import Vue from 'vue';
import electron from 'electron';
import {i18n, MODULE_PREFERENCES} from '../../common/i18n';

const appLocal = electron.remote.app.getLocale();
// const appLocal = 'zh-CN';
const preferencesWords = i18n(appLocal, MODULE_PREFERENCES);

class I18nPlugin {

  static install(Vue) {
    Vue.prototype.$i18n = (key) => {
      return preferencesWords[key];
    }
  }

}

Vue.use(I18nPlugin);
