# VUE-Player



*Vue Palyer**是一款VUE.js入门和进阶提供的学习项目，项目中参考网易云音乐和其他vue  播放器项目，制定了一个完整的vue框架，框架包括网络层，组件层和状态管理，路由管理等功能，框架设计简单，可以让用户很快入门上手，使用技术：
 
- **vue** 
- **axios**
- **JavaScript Promise**
- **jquery**
- **css animation**
- **mint ui**
- **other**

-------------------


## Vue-Player 框架介绍
- src
- assests 静态文件存放目录
- components vue组件目录
- network vue-axios网络目录
- router 路由目录
- store 存储状态
- App.vue 项目view


####如果您在阅读的这份文档，您需要掌握以下技能:。 

###Javascript Promise
``` 
axios/promise

function getImg(url) {  
    return Promise(function(resolve, reject) {  
        var img = new Image();  
        img.onload = function() {  
            resolve(this);  
        };  
        img.onerror = function(err) {  
            reject(err);  
        };
        img.url = url;  
    });  
}; 

```
- [1]材料：http://liubin.org/promises-book/

### CSS Animation
```
#css 唱片旋转
$(".roll_image").css("animation-play-state","running");
$(".roll_image").css("animation-play-state","paused");

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
```

- [1]材料：http://www.w3school.com.cn/css3/css3_animation.asp
- [2]材料：http://www.w3school.com.cn/cssref/pr_animation.asp
- [3]材料：http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html


### CSS Flex Layout
```
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}

```
- [1]材料：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html


### Vue 组件
```
      <div v-show="isShowIndex" class="index">
        <!-- 头部 -->
        <VHeader></VHeader>

        <!-- router控制的Tab页内容 -->
        <router-view></router-view>

        <!-- 尾部mini播放器 -->
        <VFooter></VFooter>
      </div>
```
- [1]材料：https://cn.vuejs.org/v2/guide/transitions.html

### Vue Transition
```
      <transition name="show"></transition>
```
- [1]材料：https://cn.vuejs.org/v2/guide/components.html


###Mint UI
```
// 引入全部组件
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
// 按需引入部分组件
import { Cell, Checklist } from 'minu-ui';
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
```
- [1]材料：http://mint-ui.github.io/


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

