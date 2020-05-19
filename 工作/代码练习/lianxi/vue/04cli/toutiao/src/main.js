import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'
import ElementUI from 'element-ui'// 导入element-ui模块
import 'element-ui/lib/theme-chalk/index.css' // 全局注册 所有位置都可以使用
import Component from '@/components/index'// 全局引入注册模块，不在每个组件导入
// 引入axios 封装了拦截器及其他操作
import axios from '@/until/request'

Vue.prototype.$axios = axios // 将axios 赋值给Vue对象的原型属性，全部文件可以用，不在一一导入
// 全局element-ui css
Vue.use(ElementUI)
// 全局注册 组件
Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
