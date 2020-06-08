import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
import axios from 'axios'
// 引入组件的index.js
import Compoment from '@/components'
// 全局使用组件
Vue.use(Compoment)
// 配置公共请求地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 将axios 赋值给Vue对象的原型属性
Vue.prototype.$axios = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
