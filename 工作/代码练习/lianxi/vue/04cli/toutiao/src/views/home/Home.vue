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
