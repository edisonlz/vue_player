<template lang="html">

  <transition name="fade">
    <div v-show="isShowMiniMusic" class="footer">
      <div class="mini-music">
        <div class="music-img">
          <img id="show_img" class="roll_image" @click="showPlay" ref="img" v-bind:src="audio.musicImgSrc || (musicData[0]&&musicData[0].musicImgSrc) || defaultImg">
        </div>
        <div class="music-name">
          <p @click="showPlay">{{audio.name || (musicData[0]&&musicData[0].name)}}</p>
          <ProgressBar></ProgressBar>
        </div>
        <div class="music-control">
          <i @click="play()" v-bind:class="[isPlaying ? pauseIcon : playIcon]"></i>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import ProgressBar from '../ProgressBar/ProgressBar.vue';

export default {

  components: {
    ProgressBar
  },
  mounted() {
  },
  computed: {
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    isShowAsideMenu() {
      return this.$store.state.isShowAsideMenu;
    },
    isShowMiniMusic() {
      return this.$store.state.isShowMiniMusic;
    },
    audio() {
      return this.$store.state.audio;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    musicData() {
      return this.$store.state.musicData;
    },
    skinColor() {
      return this.$store.state.skinColor;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    }

  },
  data() {
    return {
      playIcon: 'play-icon',
      pauseIcon: 'pause-icon',
      now: 0,
      nativeAudio: {},
      totalTime: '0:00',
      defaultImg: ''
    }
  },

  watch: {
    isPlaying: {
      handler(val, oldVal) {
        if(val){
          $("#show_img").css("animation-play-state","running");
        } else{
          $("#show_img").css("animation-play-state","paused");
        }
      }
    }
  },

  methods: {
    /*播放按钮*/
    play() {
      this.$store.commit('play', !this.isPlaying);
      !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play();
    },

    /*播放按钮*/
    showPlay() {
      this.$store.commit('showIndex', false);
      this.$store.commit('showMiniMusic', false);
    },
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all .3s ease-in-out;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateY(50px);
  opacity: 0;
}
.footer {
  background: #B72712;
  width: 100%;
  height: 70px;
  text-align: center;

  .mini-music {
    display: flex;
    height: 70px;
    line-height: 70px;

    .music-img {
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 35px;
        background-size: contain;
        cursor: pointer;
      }
    }

    .music-name {
      flex: 5;
      color: white;
      overflow: hidden;
      position: relative;
      width: 100%;

      p {
        position: relative;
        z-index: 1;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
        // cursor: pointer;
      }
      
    }
    .music-control {
      flex: 1.5;
      i {
        padding-right: 10px;
        width: 45px;
        height: 45px;
        margin-top: 13px;
        display: inline-block;
        cursor: pointer;
        border-radius: 22px;
      }
      .play-icon {
        background: url(./play.svg) no-repeat;
        background-size: contain;

      }
      .pause-icon {
        background: url(./pause.svg) no-repeat;
        background-size: contain;
      }
    }
  }  
}

.roll_image{
    -webkit-animation: play_rotate 10s linear infinite;
    -moz-animation: play_rotate 10s linear infinite;
    animation: play_rotate 10s linear infinite;
    /* 停止*/
    animation-play-state:paused;
    -webkit-animation-play-state:paused; /* Safari 和 Chrome */
}

@-webkit-keyframes play_rotate {
    0%{-webkit-transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}
@-moz-keyframes play_rotate {
    0%{-moz-transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}
@keyframes play_rotate {
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}
</style>
