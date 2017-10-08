<template lang="html">

  <transition name="showRouter">

    <div class="music-list">
      <div class="music-swipe">
        <swipe class="my-swipe">
          <swipe-item class="slide">
            <img src="./1.png"  @click="toggleMusic(1)" />
          </swipe-item>
          <swipe-item class="slide">
              <img src="./2.png" @click="toggleMusic(2)" />
          </swipe-item>
          <swipe-item class="slide" >
              <img src="./3.png" @click="toggleMusic(3)" />
          </swipe-item>
        </swipe>
      </div>

      <div v-for="(item, index) of musicData" class="music-item">
        <img @click="toggleMusic(index)" v-bind:src="item.musicImgSrc" class="music-img"></img>
        <span style="display:inline-block">
          <div @click="toggleMusic(index)" class="music-name">{{ (index+1) + '.&nbsp; ' + item.name}}</div>
          <div @click="toggleMusic(index)" class="music-desc">{{item.desc}}</div>
        </span>
        <span v-on:click="del(index)" class="del-icon"></span>
      </div>
      <div class="tips">没有更多歌曲了～</div>

    </div>
  </transition>

</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';

export default {
  
  name: 'MusicList',
  components: {
    Swipe,
    SwipeItem,
  },
  beforeCreate() {
    this.$store.commit('showMiniMusic', true);
  },
  mounted() {
    this.$store.commit('changeLinkBorderIndex', 1);
  },

  computed: {
    musicData() {
      return this.$store.state.musicData;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    }
  },
  watch: {
    musicData: {
      handler(val, oldVal) {
        localStorage.musics = JSON.stringify(val);
      },
      deep: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 点击切换音乐
    toggleMusic(index) {
      if (this.$store.state.audio.index === index) {
        this.DOM.audio.paused ? this.DOM.audio.play() : this.DOM.audio.pause();
        this.$store.commit('play', !this.isPlaying);
      } else {
        this.DOM.audio.play();
        this.$store.commit('play', true);
      }
      this.$store.commit('toggleMusic', index);

    },
    // 删除音乐
    del(index) {
      this.$store.commit('del', index);
    }
  }
}
</script>

<style lang="scss">
.showRouter-enter-active {
  transition: all .4s ease;
}

.showRouter-leave-active {
  transition: all 0 ease;
}

.showRouter-enter, .showRouter-leave-active {
  transform: translateX(-150px);
  opacity: 0;
}
.music-list {
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  /*padding-bottom: 40px;*/
  flex:8;
  overflow: auto;
  .music-item + .music-item {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
  .music-swipe {
    height: 200px;
    width: 100%;
    margin: 0px;
    padding: 0px;
    cursor: pointer;

    .my-swipe {
      cursor: pointer;
      height: 100%;
      color: #fff;
      font-size: 30px;
      text-align: center;
      margin: 0px;
      padding: 0px;
    }

    .slide {
      color: #fff;
      margin: 0px;
      padding: 0px;
      width:100%;
      height:100%;
      img {
        width:100%;
        height:100%;
      }
    }

  }

  .music-item {
    /*box-shadow: 0 0 1px #DD2C00;*/
    padding: 4px 6px 0 6px;
    position: relative;
    margin-bottom: 4px;
    border-radius: 5px;
    cursor: pointer;
    border: none;

    .music-img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
    span .music-name {
      cursor: pointer;
      text-overflow: ellipsis;
      text-align: left;
      width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span .music-desc {
      font-size:14px;
      padding-left:24px;
      color:#999;
      cursor: pointer;
      text-overflow: ellipsis;
      text-align: left;
      width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span.del-icon {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 20px;
      width: 20px;
      height: 20px;
      background: url('./del.svg');
      background-size: contain;
      cursor: pointer;
    }
  }
  .tips {
    text-align: center;
    margin: 12px auto;
    width: 200px;
    font-size: 80%;
    color: gray;
  }
}


</style>
