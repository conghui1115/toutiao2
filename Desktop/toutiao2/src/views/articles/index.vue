<template>
<el-card>
   <!-- 面包屑导航 -->
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>
    <!-- 表单-->
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态:">
        <!-- 放置单选框组 -->
        <el-radio-group>
          <!-- 单选框按钮 -->
          <el-radio>全部</el-radio>
          <el-radio>草稿</el-radio>
          <el-radio>待审核</el-radio>
          <el-radio>审核通过</el-radio>
          <el-radio>审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道类型">
        <el-select placeholder="请选择频道"></el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <el-date-picker type="daterange"></el-date-picker>
      </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
