import Vue from "vue";
import Vuex from 'vuex';

import electron from 'electron';

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
    changeFontSize: function (state, fontSize) {
      state.font.size = fontSize;
    },
    changeFontColor: function (state, fontColor) {
      state.font.size = fontColor;
    },
    changeFontOpacity: function (state, fontOpacity) {
      state.font.size = fontOpacity;
    },
    changeScrollSpeed: function (state, scrollSpeed) {
      state.scroll.speed = scrollSpeed;
    },
    changePauseOnMouseHover: function (state, pauseOnMouseHover) {
      state.scroll.pauseOnMouseHover = pauseOnMouseHover;
    },
    changeEnableLocalServer: function (state, enableLocalServer) {
      state.server.enableLocalServer = enableLocalServer;
    },
    changeLocalServerPort: function (state, localServerPort) {
      state.server.localServerPort = localServerPort;
    },
    changeRemoteServerUrl: function (state, remoteServerUrl) {
      state.server.remoteServerUrl = remoteServerUrl;
    }
  }
});

export default store;
