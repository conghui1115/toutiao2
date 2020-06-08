<template>
  <el-container>
    <el-aside style="width:230px">
    <home-aside></home-aside>
    </el-aside>
    <el-container>
      <el-header>
       <home-header></home-header>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Aside from '../../components/home/aside'
// import Header from '../../components/home/header'

export default {
  // components: {
  //   'home-aside': Aside,
  //   'home-header': Header
  // }
}
</script>

<style lang="less">

</style>
