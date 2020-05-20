<template>
<!-- 面包屑导航组件 -->
<!-- separator分隔符 -->
<el-breadcrumb separator='/'>
  <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
  <el-breadcrumb-item>
    <!-- 内容是动态的 居，具名插槽 -->
    <slot name='title'></slot>
  </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
