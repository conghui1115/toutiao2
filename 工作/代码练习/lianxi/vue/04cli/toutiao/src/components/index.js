// 需要用 Vue.use的方式注册
// Vue.use()会调用对象中的install 方法的第一个参数   是Vue对象
import Aside from '@/components/home/layout-aside'
import layoutHeader from '@/components/home/layout-header'
export default {
  install: function (Vue) {
    Vue.component('layout-aside', Aside)
    Vue.component('layout-header', layoutHeader)
  }
}
