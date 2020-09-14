import Vue from "vue";
import Vuex from 'vuex';

import electron, {ipcRenderer} from 'electron';

Vue.use(Vuex);

const config = electron.remote.getGlobal('__config');

const store = new Vuex.Store({
  state: {
    font: {
      size: config.fontSize,
      color: config.fontColor,
      opacity: config.fontOpacity
    },
    scroll: {
      speed: config.scrollSpeed,
      pauseOnMouseHover: config.pauseOnMouseHover
    },
    server: {
      enableLocalServer: config.enableLocalServer,
      localServerPort: config.localServerPort,
      localServerHost: config.localServerHost,
      remoteServerUrl: config.remoteServerUrl
    }
  },
  mutations: {
    fontSize: function (state, fontSize) {
      state.font.size = fontSize;
    },
    fontColor: function (state, fontColor) {
      state.font.color = fontColor;
    },
    fontOpacity: function (state, fontOpacity) {
      state.font.opacity = fontOpacity;
    },
    scrollSpeed: function (state, scrollSpeed) {
      state.scroll.speed = scrollSpeed;
    },
    pauseOnMouseHover: function (state, pauseOnMouseHover) {
      state.scroll.pauseOnMouseHover = pauseOnMouseHover;
    },
    enableLocalServer: function (state, enableLocalServer) {
      state.server.enableLocalServer = enableLocalServer;
    },
    localServerPort: function (state, localServerPort) {
      state.server.localServerPort = localServerPort;
    },
    localServerHost: function (state, localServerHost) {
      state.server.localServerHost = localServerHost;
    },
    remoteServerUrl: function (state, remoteServerUrl) {
      state.server.remoteServerUrl = remoteServerUrl;
    }
  }
});

// add event listeners for config modification
Object.keys(config)
  .forEach(key => ipcRenderer.on(key, (event, value) => {
      console.debug(`config updated in renderer processes, key: ${key}, value: ${value}`);
      store.commit(key, value);
    })
  );

export default store;
