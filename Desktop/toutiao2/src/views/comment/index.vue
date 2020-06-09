<template>
  <el-card>
    <!-- 面包屑导航 -->
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>
    <!-- 表格数据 -->
    <el-table :data="list">
      <!-- el-table-coumn 作为列  -->
      <!-- lable 表示表头 prop 表示显示的字段 -->
      <el-table-column label="标题"></el-table-column>
      <el-table-column label="评论状态"></el-table-column>
      <el-table-column label="总评论数"></el-table-column>
      <el-table-column label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- 可以放组件 -->
        <el-button size="small" type="text">修改</el-button>
        <el-button size="small" type="text">关闭评论</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        // query 参数用该在哪个位置传 axios
        // params 传get参数也是query参数
        // data 传body 参数也即是请求体参数
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
