<template lang="html">
    <div class="progress">
        <span class="start">{{transformTime(now)}}</span>

        <div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progressBar" class="progress-bar">
          <div class="now" ref="now" :style="{width: (now / nativeAudio.duration).toFixed(3)*100 + '%'}"></div>
        </div>

        <span class="end" v-text="totalTime"></span>
    </div>
</template>

<script>
export default {

data() {
    return {
      now: 0,
      nativeAudio: {},
      totalTime: '0:00'
    }
  },
  mounted() {
    this.nativeAudio = document.querySelector('audio');

    this.nativeAudio.addEventListener('play', () => {
      this.totalTime = this.transformTime(this.nativeAudio.duration);
      this.now = this.nativeAudio.currentTime;
      
      setInterval(() => {
        this.now = this.nativeAudio.currentTime;
      }, 1000)
      
    })

  },
 
  methods: {
    changeTime(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.pageX;
      this.nativeAudio.currentTime = (coordEnd - coordStart) / progressBar.offsetWidth * this.nativeAudio.duration;
      this.now = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit('play', true);
    },

    touchMove(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.touches[0].pageX;
      this.$refs.now.style.width = ((coordEnd - coordStart) / progressBar.offsetWidth).toFixed(3) * 100 + '%';
    },

    touchEnd(event) {
      this.nativeAudio.currentTime = this.$refs.now.style.width.replace('%', '')/100 * this.nativeAudio.duration;
      this.now = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit('play', true);
    },

    transformTime(seconds) {
      let m, s;
      m = Math.floor(seconds / 60);
      m = m.toString().length == 1 ? ('0' + m) : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length == 1 ? ('0' + s) : s;
      return m + ':' + s;
    }

  }
}
</script>

<style lang="scss" scoped>
      
.progress {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    bottom: 8px;
    text-align: center;
    color: rgba(255, 255, 255, .8);
    .start-time {
      flex: 1;
    }
    .progress-bar {
      position: relative;

      width: 100%;
      height: 4px;
      background-color: rgba(255, 255, 255, .8);
      vertical-align: bottom;
      border-radius: 2px;
      flex: 4;
      cursor: pointer;

      .now {
        position: absolute;
        left: 0;
        display: inline-block;
        max-width: 100%;
        width: 100%;
        height: 100%;
        background-color: #31c27c;
      }
      .now::after {
        content: "";
        position: absolute;
        left: 100%;
        width: 2px;
        height: 120%;
        background-color: white;
      }
    }
    .end-time {
      flex: 1;
    }
}

    
  
</style>