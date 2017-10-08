<template lang="html">

  <transition name="showRouter">
    <div class="music-list">

      <div v-for="(item, index) of musicData" class="music-item">
        <img @click="playMusic(index)" v-bind:src="item.musicImgSrc" class="music-img"></img>
        <span style="display:inline-block">
          <div @click="playMusic(index)" class="music-name">{{ (index+1) + '.&nbsp; ' + item.name}}</div>
          <div @click="playMusic(index)" style="font-size:14px;padding-left:24px;color:#999">{{item.desc}}</div>
        </span>
        <span v-on:click="del(index)" class="del-icon"></span>
      </div>
      <div class="tips">没有更多歌曲了～</div>

    </div>
  </transition>
</template>

<script>

export default {
  name: 'SearchMusicList',
  props: ["mData"],
  data() {
    return {
    }
  },
  methods: {
    // 点击切换音乐
    playMusic(index) {
      var data = this.mData[index];
      this.$store.commit('playMusic', data);
      this.$store.commit('addMusic', data);
      this.$store.commit('showMiniMusic', true);
    },
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
  padding-top: 4px;
  padding-left: 4px;
  padding-right: 4px;
  /*padding-bottom: 40px;*/
  flex:8;
  overflow: auto;
  .music-item + .music-item {
    border-top: 1px solid rgba(0, 0, 0, .1);
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
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      text-overflow:ellipsis;
      white-space: nowrap;
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
