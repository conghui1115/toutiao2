import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import SecondeHome from '@/views/home/secondeHome'
// import Meterial from '@/views/meterial'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    // home下的二级路由
    component: Home,
    children: [
      // 二级路由 path什么不写代表 home/下的默认组件
      {
        path: '',
        component: SecondeHome
      },
      {
        path: 'comment',
        component: () => import('@/views/comment')
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      },
      {
        path: 'articles',
        component: () => import('@/views/articles')
      },
      {
        path: 'publish/:articleId?',
        component: () => import('@/views/publish')
      },
      {
        path: 'account',
        component: () => import('@/views/account')
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
