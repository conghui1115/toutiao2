import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '@/views/login/index'// 简写
import Second from '@/components/home/second-home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    directe: '/Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 二级导航
    children: [
      {
        path: '',
        component: Second
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
