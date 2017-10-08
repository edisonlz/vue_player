<template lang="html">
  <div class="play">

    <div style="backgroundColor:#B72712" class="header">

      <div class="back">
        <div class="icon-back"><i @click="back"></i></div>
      </div>

      <div class="title">
        <div class="name">{{audio.name || (musicData[0]&&musicData[0].name) }}</div>
      </div>

      <div  style="width:60px">
      </div>

    </div>

    <div class="content">
      <img :src="audio.musicImgSrc || (musicData[0] && musicData[0].musicImgSrc)" >
      <div class="img">
        <img class="roll_image" :src="audio.musicImgSrc || (musicData[0]&&musicData[0].musicImgSrc)" >
      </div>

     <PlayProgressBar></PlayProgressBar>

    </div>

    <div  class="footer">
      <div class="prev">
        <div class="icon-prev"><i @click="prev"></i></div>
      </div>

      <div class="play">
        <div class="icon-play"><i @click="play" :class="[isPlaying ? 'pause-icon' : 'play-icon']"></i></div>
      </div>

      <div class="next">
        <div class="icon-next"><i @click="next"></i></div>
      </div>

    </div>
  </div>
</template>

<script>
import PlayProgressBar from '../ProgressBar/PlayProgressBar.vue';

export default {
  name: 'play',
  components: {
    PlayProgressBar
  },
  mounted() {
   
  },
  computed: {
    audio() {
      return this.$store.state.audio;
    },
    musicData() {
      return this.$store.state.musicData;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    DOM() {
      return this.$store.state.DOM;
    }
  },
  data() {
    return {
      defaultImg: '',
      playIcons: ['url("./play.svg")', 'url("./pause.svg")'],
    }
  },
  watch: {
    isPlaying: {
      handler(val, oldVal) {
        if(val){
          $(".roll_image").css("animation-play-state","running");
        } else{
          $(".roll_image").css("animation-play-state","paused");
        }
      }
    }
  },
  methods: {
    back() {
      this.$store.commit('showIndex', true);
      this.$store.commit('showMiniMusic', true);
      this.isShowSkinColors = false;
      this.isShowMusicList = false
    },
    toggleMusic(index) {
      this.$store.commit('toggleMusic', index);
      this.$store.commit('play', true);
      setTimeout(() => {
        this.isShowMusicList = false;
      }, 100);
    },
    prev() {
      this.audio.index = this.audio.index === 0 ? this.musicData.length - 1 : (--this.audio.index);
      this.$store.commit('toggleMusic', this.audio.index);
    },
    play() {
      this.$store.commit('play', !this.isPlaying);
      !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play();
    },
    next() {
      this.audio.index = this.audio.index === this.musicData.length - 1 ? 0 : (++this.audio.index);
      this.$store.commit('toggleMusic', this.audio.index);
    }
    
  }
}
</script>

<style lang="scss" scoped>

  .play {
    
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .header {
      position: relative;
      z-index: 1;
      flex: .9;
      display: flex;
      .back {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-back i {
          display: inline-block;
          background: url('./back.svg') no-repeat;
          background-size: contain;
          width: 22px;
          height: 22px;
          vertical-align: bottom;
          cursor: pointer;
        }
      }
      .title {
        flex: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        width: 100%;
        .name {
          text-align: center;
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

    }
    .content {
      position: relative;
      flex: 9;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      
      img {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        filter: brightness(65%) blur(8px);
      }
      .img {
        width: 300px;
        height: 300px;
        img {
          position: relative;
          filter: blur(0);
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 150px;
        }
      }
      
    }
    .footer {
      flex: 1;
      display: flex;
      position: relative;
      z-index: 1;
      padding-left: 40px;
      padding-right: 40px;
      background-color: #B72712;
      .prev {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-prev i{
          display: inline-block;
          background: url('./prev.png') no-repeat;
          background-size: contain;
          width: 40px;
          height: 40px;
          vertical-align: bottom;
          cursor: pointer;

        }
      }
      .play {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-play i{
          display: inline-block;
          background-repeat: no-repeat;
          background-size: contain;
          width: 40px;
          height: 40px;
          vertical-align: bottom;
          cursor: pointer;
        }
        .play-icon {
          background: url(./play.png) no-repeat;
          background-size: contain;
        }
        .pause-icon {
          display: inline-block;
          background: url(./pause.png) no-repeat;
          background-size: contain;
        }
      }
      .next {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-next i{
          display: inline-block;
          background: url('./next.png') no-repeat;
          background-size: contain;
          width: 40px;
          height: 40px;
          vertical-align: bottom;
          cursor: pointer;
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
