// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Login from './pages/Login'
import Main from './pages/Main'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

// eslint-disable-next-line import/no-duplicates
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// element-ui的css
// eslint-disable-next-line import/no-duplicates,no-redeclare
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(ElementUI) // 使用elementUI
// eslint-disable-next-line no-unused-vars
Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://www.involute.cn:8100/' // 接口ip:端口号
// axios.defaults.baseURL = 'http://127.0.0.1:8100/' // 接口ip:端口号

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Main },
  template: '<Main/>'
})
