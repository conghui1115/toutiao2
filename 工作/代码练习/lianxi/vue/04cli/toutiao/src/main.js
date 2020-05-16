import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 导入element-ui模块
import 'element-ui/lib/theme-chalk/index.css'// 全局element-ui css
Vue.use(ElementUI) // 全局注册 所有位置都可以使用
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
