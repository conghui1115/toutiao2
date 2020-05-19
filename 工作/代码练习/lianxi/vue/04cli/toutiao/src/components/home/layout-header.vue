<template>
  <el-row  class="layout-header" align="middle" type="flex">
    <el-col :span='12' class="left">
      <i class="el-icon-s-fold"></i>
      <span>告白气球娱乐周报</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="12" class="right">
      <el-row justify="end" type="flex" align="middle">
        <img :src="userInfo.photo" alt="">
        <!-- 下拉菜单 -->
        <!-- @command跳转 -->
        <el-dropdown trigger="click" @command="clickMenu">
          <span>{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <!-- command 属性 -->
            <el-dropdown-item command='info'>个人信息</el-dropdown-item>
            <el-dropdown-item command='git'>git地址</el-dropdown-item>
            <el-dropdown-item command='logout'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}// 用户个人信息
    }
  },
  methods: {
    // 点击头部下拉菜单的事件 特别是退出
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/conghui1115/toutiao'
      } else {
        // 点击退出，一个是删除token 2，去login页面,
        // 但是不是彻底的退出，需要导航守卫
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    // 获取用户资料 需要登录是带的token
    // const token = window.localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      method: 'get'
      // 带上头部信息
      // until里面设置了
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
      .then(result => {
        // 获取结果赋值给data对象
        this.userInfo = result.data.data
      })
  }
}
</script>

<style lang='less' scoped>
.layout-header{
  height: 60px;
  .left{
    i{
      font-size: 20px;
    }
  }
  .right{
    img{
      widows: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;

    }
  }
}
</style>
