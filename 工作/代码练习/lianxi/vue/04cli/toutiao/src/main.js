import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 导入element-ui模块
import 'element-ui/lib/theme-chalk/index.css' // 全局注册 所有位置都可以使用
// 引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置公共请求地址
Vue.prototype.$axios = axios // 将axios 赋值给Vue对象的原型属性，全部文件可以用，不在一一导入
// 全局element-ui css
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
