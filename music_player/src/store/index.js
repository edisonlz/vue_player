import Vue from 'vue'
import Vuex from 'vuex'
import { api_music_data } from "../network/handler/music_data_api"
// Vuex 进行状态管理
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    musicData: [],
    searchData: [],
    isShowIndex: true,
    isPlaying: false,
    isAnimation: false,
    isShowMiniMusic: false,
    linkBorderIndex: '',
    DOM: {},
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    }
  },
  mutations: {
    /* 删除音乐by index */
    del(state, index) {
      if (state.musicData.length === 0) {
        return;
      }
      state.musicData.splice(index, 1)
    },

    /* 标记播放状态 */
    play(state, flag) {
      state.isPlaying = flag;
    },

    /* 提交音乐 */
    addMusic(state, payload) {
      /* 检查是否音乐已经存在 */
      for (var music in state.musicData) {
        var d = state.musicData[music];
        if (JSON.stringify(d) === JSON.stringify(payload)) {
          return;
        }
      }
      state.musicData.unshift(payload);
      localStorage.musics = JSON.stringify(state.musicData);
    },

    /* 更改选中音乐 */
    toggleMusic(state, index) {
        state.audio.name = state.musicData[index].name;
        state.audio.src = state.musicData[index].src;
        state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
        state.audio.index = index;
    },
    
    /* 播放音乐 */
    playMusic(state, payload) {
      state.audio.name = payload.name;
      state.audio.src = payload.src;
      state.audio.musicImgSrc = payload.imgSrc;
      state.isPlaying = true;
    },

    /* 更改导航index */
    changeLinkBorderIndex(state, index) {
      state.linkBorderIndex = index;
    },

    findDOM(state, payload) {
      state.DOM[payload.name] = payload.dom;
    },
    /* 是否显示底部播放条 */
    showMiniMusic(state, flag) {
      state.isShowMiniMusic = flag;
    },

    showIndex(state, flag) {
      state.isShowIndex = flag;
    },
    /* 变更导航条 */
    changeLinkBorderIndex(state, index) {
      state.linkBorderIndex = index;
    },

  },
  
  actions: {

    getData({ commit,state }) {
      if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics);
        return;
      }

      return new Promise((resolve, reject) => {
        api_music_data().then (res => {
              if (res.data.errno === 0) {
                state.musicData = res.data.musicData;
                localStorage.musics = JSON.stringify(state.musicData);
              }
            }).then(() => {
              commit('toggleMusic',0)
            });
        resolve();
      });
    }
    
  }

});