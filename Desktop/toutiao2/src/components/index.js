// 用Vue.use()方式注册
// vue.use会调用对象中的install方法 install第一个参数是Vue
import Aside from './home/aside'
import Header from './home/header'
import Breadcrumb from './home/breadcrumb'

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install: function (Vue) {
    // 注册全局组件
    Vue.component('home-aside', Aside)
    Vue.component('home-header', Header)
    Vue.component('bread-crumb', Breadcrumb)
    Vue.use(VueQuillEditor)
  }
}
