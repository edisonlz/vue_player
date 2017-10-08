<template lang="html">
  <transition name="showRouter">
    <div class="box">
        <div>
          <img class="head" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505997079557&di=4e30d4eb1948d8344fc51dc11438930e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Da8b9591817950a7b6138468762b808ac%2F03087bf40ad162d9166260321bdfa9ec8a13cd14.jpg" />
        </div>
        <div class="username">
          醋溜出品
        </div>
    </div>
  </transition>
</template>
feec4b2fa0869e4eac9c3a6c2af17b6b
<script>
import { Actionsheet } from 'mint-ui';

export default {
  name: 'my',
  // components{
  //   Actionsheet
  // },
  beforeCreate() {
  },
  created() {
  },
  mounted() {
    this.$store.commit('showMiniMusic', false);
    this.$store.commit('changeLinkBorderIndex', 3);
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.showRouter-enter-active {
  transition: all .3s ease;
}
.showRouter-leave-active {
  transition: all 0 ease-out;
}
.showRouter-enter, .showRouter-leave-active {
  transform: translateX(250px);
  opacity: 0;
}

.box {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding-top:20px;
      justify-content: flex-start;
      align-items: center;

      .head {
          width:180px;
          height:180px;
          border-radius: 90px;
      }
      .username {
          display: flex;
          display: -webkit-flex; /* Safari */
          padding-top:20px;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
      }
}
</style>
