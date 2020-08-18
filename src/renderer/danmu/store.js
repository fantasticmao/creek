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
      time: 7
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
        state.scroll.time = 5;
      } else if (scrollSpeed === 'Normal') {
        state.scroll.time = 10;
      } else if (scrollSpeed === 'Slow') {
        state.scroll.time = 15;
      } else {
        throw new Error(`unknown speed type: ${scrollSpeed}`)
      }
    }
  }
});

export default store;
