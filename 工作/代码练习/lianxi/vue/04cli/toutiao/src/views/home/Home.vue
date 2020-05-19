<template>
  <el-container>
    <el-aside>
     <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <h1>内容</h1>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Aside from '@/components/home/layout-aside'
// import layoutHeader from '@/components/home/layout-header'
export default {
  // components: {
  //   'layout-aside': Aside,
  //   'layout-header': layoutHeader
  // }

}
</script>
