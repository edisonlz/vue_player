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
    width: 100%;
    top: 10px;
    left: 0;
    span.start {
      position: absolute;
      left: 6px;
      // padding-right: 5px;
    }
    span.end {
      position: absolute;
      right: 4px;
      // padding-left: 5px;
    }
    @media screen and(min-width: 600px) {
      span.start {
        position: absolute;
        left: 26px;
      }
      span.end {
        position: absolute;
        right: 30px;
      }
    }
    .progress-bar {
      position: relative;
      width: 50%;
      height: 5px;
      display: inline-block;
      background-color: rgba(255, 255, 255, .5);
      vertical-align: 2px;
      border-radius: 3px;
      cursor: pointer;

      .now {
        position: absolute;
        left: 0;
        display: inline-block;
        max-width: 100%;
        // width: 70%;
        height: 5px;
        background-color: #31c27c;
      }
      .now::after {
        content: "";
        position: absolute;
        left: 100%;
        width: 2px;
        height: 6px;
        background-color: white;
      }
    }
}
    
  
</style>