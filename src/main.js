// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 加载kindeditor的配置
import VueKindEditor from './plugins/kindeditor.js'
import '../static/kindeditor/themes/default/default.css'
import '../static/kindeditor/kindeditor-all-min.js'
import '../static/kindeditor/lang/zh-CN.js'
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 进入公共js文件
import common from './utils/functions.js'

Vue.use(VueKindEditor)

Vue.use(ElementUI)
// const ajax = axios.create({
//   baseURL: 'http://127.0.0.1:8000'
// })
Vue.config.productionTip = false
// Vue.prototype.axios = ajax
// Vue.prototype.axios = axios
Vue.prototype.common = common

Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
