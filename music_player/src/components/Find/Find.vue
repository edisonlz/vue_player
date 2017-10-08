<template lang="html">
  <transition name="showRouter">
    <div class="find">
      <div class="search-input">

        <!-- 搜索框 -->
        <div class="input">
          <i class="icon-search"></i>
          <input v-model="keywords" @keyup.enter="toSearch(keywords)" @focus="inputFocus" v-bind:class="{'input-focus': !isShowHot}" type="text" placeholder="搜索歌曲">
          <i @click="keywords=''" v-show="keywords!==''&&!isShowHot" class="icon-cancel"></i>
          <div v-show="!isShowHot" @click="isShowHot=true" class="cancel-btn">取消</div>
        </div>

      </div>

      <!-- 热门搜索 -->
      <div v-if="isShowHot" class="hot">
        热门搜索
        <div class="keywords">
          <div v-for="item of hotKeywords" v-text="item" @click="toSearch(item)" class="keyword"></div>
        </div>
      </div>

      <div v-else class="search-list">

        <!-- 搜索历史 -->
        <div v-show="isShowHistory" v-for="(item, index) of searchHistory" class="history">
          <div class="icon"><i class="icon-history"></i></div>
          <div @click="toSearch(item)" class="word">{{item}}</div>
          <div class="icon"><i @click="searchHistory.splice(index, 1)" class="icon-del"></i></div>
        </div>

        <!-- 清除搜索记录 -->
        <div v-show="isShowHistory && searchHistory.length" @click="searchHistory=[]" class="tips">清除搜索记录</div>

        <!-- 搜索返回列表 -->
        <div v-show="isLoading" class="loading"><mt-spinner type="snake" color="#26a2ff" class="icon-loading"></mt-spinner></div>

        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10" >
          
          <li v-for="(item, index) of musicList" class="music-item">
              <img @click="playMusic(index);" v-bind:src="item.musicImgSrc" class="music-img"></img>
              <span @click="playMusic(index);" style="display:inline-block">
                <div class="music-name">{{ (index+1) + '.&nbsp; ' + item.name}}</div>
                <div class="music-desc">{{item.desc}}</div>
              </span>
          </li>
        </ul>
        
        
      </div>
    </div>
  </transition>

</template>

<script>
import { Spinner } from 'mint-ui';
export default {

  name: 'find',
  components: {
      Spinner
  },
  beforeCreate() {
  },
  created() {
  },
  mounted() {
    this.$store.commit('showMiniMusic', true);
    this.$store.commit('changeLinkBorderIndex', 2);
  },
  data() {
    return {
      keywords: '',
      hotKeywords: ['小半','只道寻常','民谣', '留香'],
      isShowHot: true,
      musicList: [],
      playIndex: '',
      isLoading: false,
      isShowHistory: false,
      searchHistory: (localStorage.searchHistory && JSON.parse(localStorage.searchHistory)) || []
    }
  },
  watch: {
    searchHistory: {
      handler(val) {
        localStorage.searchHistory = JSON.stringify(val);
      },
      deep: true
    }
  },
  methods: {
    /* 播放音乐 */
    playMusic(index) {
      var data = this.musicList[index];
      this.$store.commit('playMusic', data);
      this.$store.commit('addMusic', data);
      this.$store.commit('showMiniMusic', true);
    },
    /* 加载更多 */
    loadMore(){
      this.axios.get('/api/search/20/1')
          .then(res => res.data)
          .then(datalist => {
            this.musicList = this.musicList.concat(datalist);
          })
    },
    /* 搜索 */
    toSearch(keywords) {
      if (keywords.trim()) {
        this.isShowHistory = false;
        this.isShowHot = false;
        this.playIndex = null;
        this.isLoading = true;
        this.keywords = keywords;

        this.axios.get('/api/search/20/' + keywords)
          .then(res => res.data)
          .then(datalist => {
            this.musicList = datalist;
            this.isLoading = false;
            this.searchHistory.unshift(keywords);
          })
      }
    },
    /* 焦点 */
    inputFocus() {
      if (this.keywords.trim()) {
        return;
      }
      else {
        this.isShowHot = false;
        this.isShowHistory = true;
        this.musicList = [];
      }
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

.find {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex:10;
    overflow: auto;

    .search-input {
      position: relative;
      background-color: #EFF2F7;
      text-align: center;
      border-bottom: 1px solid #EFF2F7;


      .input {
        position: relative;
        width: 90%;
        height: 35px;
        margin: 6px auto;
        text-align: left;
        i.icon-search {
          position: absolute;
          top: 7px;
          left: 6px;
          display: inline-block;
          height: 20px;
          width: 20px;
          background: url('./find.svg') no-repeat;
          background-size: contain;
        }
        input {
          border-radius: 3px;
          border: none;
          padding: 0 34px;
          width: 100%;
          height: 100%;
          font-size: 1rem;
          outline: none;
        }
        i.icon-cancel {
          position: absolute;
          top: 7px;
          right: 21%;
          display: inline-block;
          height: 20px;
          width: 20px;
          background: url('./cancel.svg') no-repeat;
          background-size: contain;
        }
        .input-focus {
          width: 80%;
        }
        .cancel-btn {
          vertical-align: top;
          padding: 7px 10px;
          height: 100%;
          background-color: none;
          display: inline-block;
        }
      }

    }

    .hot {
      flex: 8;
      padding: 10px;
      .keywords {
        display: flex;
        flex-wrap: wrap;
        padding-top: 10px;
        padding-left: 16px;
        .keyword:hover {
          border: 1px solid orange;
        }
        div {
          text-align: center;
          width: 25%;
          padding: 5px;
          border: 1px solid gray;
          margin-right: 8%;
          margin-bottom: 10px;
          border-radius: 20px;
          cursor: pointer;
        }
        div:nth-of-type(1) {
          border-color: red;
          box-shadow: none;
          color: red;

        }
      }
    }
    .search-list {
      flex: 9;
      overflow: auto;
      .history + .history {
        border-top: 1px solid rgba(0, 0, 0, .1);
      }
      .history {
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: center;
        align-items: center;

        .icon {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .icon-history {
          display: inline-block;
          width: 23px;
          height: 23px;
          background: url('./history.svg') no-repeat;
          background-size: contain;
        }
        .icon-del {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url('./del.svg') no-repeat;
          background-size: contain;
        }
        .word {
          flex: 5;
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .tips {
        text-align: center;
        margin: 12px auto;
        width: 200px;
        font-size: 80%;
        color: gray;
      }
      .loading {
        padding-top: 10px;
        text-align: center;

        .icon-loading {
          display: inline-block;
          margin: 0 auto;
          width: 22px;
          height: 22px;
        }
      }
    
    }
  }
  @keyframes listening {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(1.3);
    }
    66% {
      transform: scale(1);
    }
  }


  .music-item {
    /*box-shadow: 0 0 1px #DD2C00;*/
    padding: 4px 6px 0 6px;
    position: relative;
    margin-bottom: 4px;
    border-radius: 2px;
    cursor: pointer;
    border: none;

    .music-img {
      width: 50px;
      height: 50px;
      border-radius: 2px;
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

    span .del-icon {
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
</style>
