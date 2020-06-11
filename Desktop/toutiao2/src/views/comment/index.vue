<template>
  <el-card v-loading="loading">
    <!-- 面包屑导航 -->
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>
    <!-- 表格数据 -->
    <el-table :data="list">
      <!-- el-table-coumn 作为列  -->
      <!-- lable 表示表头 prop 表示显示的字段 -->
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态" :formatter="getCommentStatus"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- 可以放组件 -->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button size="small" type="text" @click="openOrClose(obj.row)">{{obj.row.comment_status ? '关闭':'打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
     <el-row type="flex" justify="center" align="middle" style="height:80px">
       <el-pagination
       background
       layout="prev,pager,next"
       :total="page.total"
       :current-page="page.currentPage"
       :page-size="page.pageSize"
       @current-change="currentChange"
       >

       </el-pagination>
     </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 默认是0
        currentPage: 1,
        pageSize: 10 // 默认是10

      },
      loading: false
    }
  },
  methods: {
    // 分页逻辑
    currentChange (newPage) {
      // newPage为最新的求换页码
      this.page.currentPage = newPage// 赋值最新页码
      // 重新拉取数据
      this.getComment() // 获取评论
    },
    getComment () {
      // 设置加载遮罩层
      this.loading = true
      this.$axios({
        url: '/articles',
        // query 参数用该在哪个位置传 axios
        // params 传get参数也是query参数
        // data 传body 参数也即是请求体参数
        params: {
          response_type: 'comment',
          page: this.page.currentPage, // 查对应页码
          per_page: this.page.pageSize// 查10条
        }
      }).then(result => {
        // console.log(result)
        this.list = result.data.results
        // 获取完数据 之后 将总值赋值给total
        this.page.total = result.data.total_count// 将总值赋值
        // 请求完毕  关闭遮罩
        this.loading = false
      })
    },
    // 评论状态修改， true false不显示  需要fatmatter属性 格式化代码
    getCommentStatus (row, column, cellValue, index) {
      // row 代表当前的数据
      // column 代表当前列信息
      // cellValue 代表当前单元格
      // index索引
      // 需要返回值
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭的逻辑
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // $confirm 也支持 promise 点击确定会进入到then 点击取消会进入到catch
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        // 调用打开或者关闭接口
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          // query参数
          params: {
            article_id: row.id.toString() // id位数太多超过安全数字，报错 要求参数的文章id 使用大数字类型  axios那里处理
          },
          data: {
            //  body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        }).then(() => {
          //   成功了 提示个消息 然后 重新拉取数据4
          this.$message.success(`${mess}评论成功`)
          //  重新拉取数据
          this.getComment() // 调用重新拉取数据的方法
        }).catch(() => {
          //   表示失败了 会进入到catch
          this.$message.error(`${mess}评论失败`)
        })
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
