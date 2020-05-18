<template>
  <div class="layout-aside">
    <!-- 头部图片 -->
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt="">
    </div>
  <!-- 导航菜单 -->
  <el-menu background-color="#323745" text-color="#adafb5">
    <el-menu-item>
      <i class="el-icon-s-custom"></i>
      <span>首页</span>
    </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-s-flag"></i>
          <span>内容管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item>发布文章</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-platform-eleme"></i>
          <span>粉丝管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
      </el-submenu>
     <el-menu-item>
      <i class="el-icon-s-goods"></i>
      <span>账户信息</span>
    </el-menu-item>
  </el-menu>

  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-aside{
  width: 300px;
  height: 100vh;
  background:#2e2f32 ;
  .title{
    text-align: center;
    padding: 10px 0;
    img{
      height: 35px;
    }
  }
  .el-menu{
    border-right: none;

  }
}
</style>
