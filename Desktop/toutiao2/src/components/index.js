// 用Vue.use()方式注册
// vue.use会调用对象中的install方法 install第一个参数是Vue
import Aside from './home/aside'
import Header from './home/header'
export default {
  install: function (Vue) {
    // 注册全局组件
    Vue.component('home-aside', Aside)
    Vue.component('home-header', Header)
  }
}