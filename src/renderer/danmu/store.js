import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    font: {
      size: 36,
      color: '#FFFFFF',
      opacity: 0.75
    },
    scroll: {
      speed: 200,
      pauseOnMouseHover: false
    },
    server: {
      enableLocalServer: true,
      localServerPort: 9508,
      localServerHost: '0.0.0.0',
      remoteServerUrl: ''
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
      if (scrollSpeed === 'Slow') {
        state.scroll.speed = 100; // 100px/s
      } else if (scrollSpeed === 'Default') {
        state.scroll.speed = 200; // 200px/s
      } else if (scrollSpeed === 'Fast') {
        state.scroll.speed = 400; // 400px/s
      } else {
        throw new Error(`unknown speed type: ${scrollSpeed}`)
      }
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
