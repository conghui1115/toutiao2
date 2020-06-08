// 专门处理路由权限问题,
// 就是每次路由发生改变前， 判断有没有token值，有代表能访问，不能直接到登录页面
import router from '@/router'
// 注册全局前置守卫
// 调用函数会在路由发生改变前执行
// to,from 是对象
router.beforeEach(function (to, from, next) {
  // 先判断 需要拦截哪些页面 如果地址以 home开头 startsWith()，需要进行 token 的判断,有直接放过，没有做别的
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
