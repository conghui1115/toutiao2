<template>
  <el-row  class="layout-header" align="middle" type="flex">
    <el-col :span='12' class="left">
      <i class="el-icon-s-fold"></i>
      <span>告白气球娱乐周报</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="12" class="right">
      <el-row justify="end" type="flex" align="middle">
        <img src="http://img3.imgtn.bdimg.com/it/u=466636099,2440212896&fm=11&gp=0.jpg" alt="">
        <!-- 下拉菜单 -->
        <el-dropdown>
          <span>默认名<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>

        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {

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
