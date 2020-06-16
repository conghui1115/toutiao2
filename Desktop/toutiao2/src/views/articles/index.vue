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
        <!-- <el-radio-group v-model="searchForm.status " @change="changeCondition"> -->
        <el-radio-group v-model="searchForm.status ">
          <!-- 单选框按钮 -->
          <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 / 先将 5 定义成 全部 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道类型 -->
      <el-form-item label="频道类型">
        <!-- <el-select placeholder="请选择频道" v-model="searchForm.channel_id" @change="changeCondition"> -->

          <!-- watch监视数据的改变 -->
          <el-select placeholder="请选择频道" v-model="searchForm.channel_id" >
          <el-option v-for="item in channels" :value="item.id" :key="item.id" :label="item.name" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <!-- <el-date-picker type="daterange" v-model="searchForm.dateRange" @change="changeCondition" value-format="yyyy-MM-dd"></el-date-picker> -->
        <el-date-picker type="daterange" v-model="searchForm.dateRange"  value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </el-form>
    <!--列表内容 -->
    <div class="articles">
      <div class="title">文章列表</div>
      <div class="article-item" v-for='item in list' :key="item.id.toString()">
        <!-- 左侧内容 -->
        <div class="left">
          <img
            :src='item.cover.images.length>0? item.cover.images[0] : defaultImg'
            alt
          />
          <div class="info">
            <span>{{item.title}}</span>
            <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 / 先将 5 定义成 全部 -->
            <!-- 知识改变显示格式 可以使用过滤器 -->
            <el-tag class="tag" :type=" item.status| filterType">{{item.status | filtersSatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <span>
            <i class="el-icon-edit"></i> 修改
          </span>
          <span @click ="deleMetails(item.id)">
            <i class="el-icon-delete"></i> 删除
          </span>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-row style="height:60px" type="flex" align="middle" justify="center">
       <el-pagination
        background
        layout="prev,pager,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change='changePage'
        >
        </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认是全部状态
        channel_id: null, //
        dateRange: [] // 日期范围
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/pic_bg.png'), // 定义默认图片 引入，固定地址编译的时候出错
      page: {
        pageSize: 10,
        total: 100,
        currentPage: 1
      }
    }
  },
  methods: {
    // 搜索条件 方法一
    changeCondition () {
      // 应该请求传入的参数
      const params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 直接调取方法
      this.getArticles(params)
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        // params搜索的时候需要用，获取文章列表不用
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage
      // 条件筛选
      this.changeCondition()
    },
    // 删除文章
    deleMetails (id) {
      // 先友好提示
      //  先友好的提示一下
      this.$confirm('您确定删除此条数据?', '提示').then(() => {
        // 如果进入了then 表示点击了确定
        this.$axios({
          method: 'delete',
          url: `/articles/${id}` // 地址 是  /articles/:target target 是文章id
        }).then(() => {
          // 如果删除成功了
          // 重新获取数据
          //  this.getArticles() // 如果这么写 就意味着你 舍去了当前的页码和条件 不能这么写
          // 应该带着条件和页码去加载
          this.changeCondition() // 重新加载
        }).catch(() => {
          this.$message.error('删除文章失败')
        })
      })
    }

  },
  // // 搜索条件 方法二
  watch: {
    searchForm: {
      deep: true,
      handler () {
        // 同意调用改变条件的方法
        this.page.currentPage = 1
        this.changeCondition()
      }
    }
  },
  filters: {
    // 文章状态
    filtersSatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器可以在插值表达式写，也可以在v-bind里面写
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.articles{
  .title{
    height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .article-item{
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .left{
      display: flex;
      img{
        width: 180px;
        height: 100px;
        border-radius: 4px;

      }
      .info{
        display: flex;
        flex-direction: column;
        height:100px;
        justify-content: spance-around;
        margin-left: 10px;
        .date{
          color: #999;
          font-size: 12px;
        }
        .tag{
          width: 60px;
          text-align: center;
          margin: 10px 0;
        }
      }
    }
    .right{
      span{
        font-size: 12px;
        margin-right: 8px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
