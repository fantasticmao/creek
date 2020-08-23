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
      speed: 200
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
      if (scrollSpeed === 'Fast') {
        state.scroll.speed = 100; // 100px/s
      } else if (scrollSpeed === 'Normal') {
        state.scroll.speed = 200; // 200px/s
      } else if (scrollSpeed === 'Slow') {
        state.scroll.speed = 400; // 400px/s
      } else {
        throw new Error(`unknown speed type: ${scrollSpeed}`)
      }
    }
  }
});

export default store;
