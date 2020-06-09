<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <el-breadcrumb>
      <slot name=title></slot>
    </el-breadcrumb>

  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
