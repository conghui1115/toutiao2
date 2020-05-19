// axios 拦截器
import axios from 'axios'
import router from '@/router'
// 其他操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置公共请求地址
// 请求拦截器的操作
axios.interceptors.request.use(function (config) {
  // 成功时执行  第一个 参数 会有一个config  config 就是所有的axios的请求信息
  // 在第一个函数中 需要将配置进行返回  返回的配置 会作为 请求参数进行请求
//     在返回之前 就是我们统一注入token的最佳时间
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
},
function (err) {
  // 失败时 会有一个错误 直接reject错误即可
  // 失败时执行第二个  axios 是一个支持promise  如果失败了 我们应该直接reject  reject会直接进入到axios的catch中
  return Promise.reject(err)
})

// 响应拦截器  是 服务器返回的数据 到达  axios then之前的数据
axios.interceptors.response.use(function (response) {
  // 回调函数第一个参数 是响应体
  // 在拦截器中 需要将数据返回  将数据进行解构
  // 这样  axios  then 得到的数据解绑一层，不在需要result.data.data
  // axios请求的数据 then(response.data别忘了改)
  // debugger
  return response.data ? response.data : {}
},
function (error) {
  // 失败的时候执行
  // error是错误对象 里面包含了错误的状态码 和响应信息
  // 401 状态码  表示用户认证失败 用户身份不对
  // 401出现的时候 表示 拿错钥匙/钥匙过期/钥匙没拿/钥匙名不对/钥匙格式不对 ...
  // 之前的导航守卫  校验了token有没有 检查了钥匙有没有
  // 应该换一个新钥匙 项目1 讲一种比较粗暴的换钥匙 项目2 讲一种比较温柔的钥匙
  // 粗暴的换钥匙 回登录页 => 重新登录换一把新的 重来
  // 回登录页之前 应该把旧钥匙给清除掉
  if (error.response.status === 401) {
    // 删除钥匙
    window.localStorage.removeItem('user-token')
    // // 跳回登录页
    router.push('/login')
    // 直接导入路由实例对象 使用跳转方式 和组件中this.$router是一样的
    return Promise.reject(error)
  }
})
// 导出
export default axios
