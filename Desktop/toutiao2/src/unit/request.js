/*
封装请求工具
对于 axios的第二次封装
配置拦截器 以及其他
*/
import axios from 'axios'
import router from '../router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
//  拦截器
axios.interceptors.request.use(function (config) {
  // 成功时执行， 第一个参数 会有一个 config config就是所有的axios 的请求信息
  // 第一个函数中 需要将配置返回， 返回配合，会作为 请求参数进行请求
  // 再返回之前就是我们统一 注入token的最佳时间
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 失败时 会有一个错误  直接reject 错误即可
  // 失败时执行第二个 axios是支持promise 如果失败 接reject reject 会直接进入到axios
  return Promise.reject(error)
})
// 响应拦截器开发
axios.interceptors.response.use(function (response) {
  // 回调函数第一个参数 是响应体
  // 在拦截器中 需要将数据返回 将数据结构
  // debugger
  return response.data ? response.data : {}
}, function (error) {
  // 失败执行
  // error是错误对象 里面包含错误的状态码  和响应信息
  // 401 表示用户认证失败 用户身份不对
  // 401 出现 表示拿错钥匙/钥匙过期/钥匙没拿/钥匙名不对/钥匙格式不对
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')// 删除钥匙
    router.push('/login')
  }
})

export default axios
