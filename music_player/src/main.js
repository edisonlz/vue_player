// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios);
//加载ui库
Vue.use(MintUI);


/* 初始化router */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

