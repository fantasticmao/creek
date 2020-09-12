import Vue from 'vue';
import Vuex from 'vuex';

import logoWhiteUrl from '../../resources/icon-white.iconset/icon_64x64@2x.png';
import logoDarkUrl from '../../resources/icon-dark.iconset/icon_64x64@2x.png';

import iconDisplayWhite from '../../resources/display-white.svg';
import iconDisplayDark from '../../resources/display-dark.svg';
import iconServerWhite from '../../resources/server-white.svg';
import iconServerDark from '../../resources/server-dark.svg';
import iconAboutWhite from '../../resources/about-white.svg';
import iconAboutDark from '../../resources/about-dark.svg';

import electron, {nativeImage} from 'electron';

const nativeTheme = electron.remote.nativeTheme;

const logoWhite = nativeImage.createFromDataURL(logoWhiteUrl);
const logoDark = nativeImage.createFromDataURL(logoDarkUrl);

Vue.use(Vuex);

function newThemeConfig(shouldUseDarkColors) {
  return {
    logo: {
      url: shouldUseDarkColors ? logoWhiteUrl : logoDarkUrl,
      image: shouldUseDarkColors ? logoWhite : logoDark,
    },
    icon: {
      display: shouldUseDarkColors ? iconDisplayWhite : iconDisplayDark,
      server: shouldUseDarkColors ? iconServerWhite : iconServerDark,
      about: shouldUseDarkColors ? iconAboutWhite : iconAboutDark
    },
    color: {
      head: shouldUseDarkColors ? '#464646' : '#D8D8D8',
      head_border: shouldUseDarkColors ? '#000000' : '#DADADA',
      main: shouldUseDarkColors ? '#2D2D2D' : '#ECECEC',
      font: shouldUseDarkColors ? '#DFDFDF' : '#2E2E2E',
      toolbar_item_active: shouldUseDarkColors ? '#585856' : '#C2C2C2',
    }
  };
}

const store = new Vuex.Store({
  state: {
    theme: newThemeConfig(nativeTheme.shouldUseDarkColors)
  },
  mutations: {
    update: function (state, shouldUseDarkColors) {
      state.theme = newThemeConfig(shouldUseDarkColors)
    }
  }
});

// add event listeners for system theme updated
nativeTheme.on('updated', () => {
  store.commit('update', nativeTheme.shouldUseDarkColors);
});

export default store;
