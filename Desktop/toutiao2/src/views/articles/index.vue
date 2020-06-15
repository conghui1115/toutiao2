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
      <el-form-item label="频道类型">
        <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
          <el-option v-for="item in channels" :value="item.id" :key="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期范围">
        <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
      </el-form-item>
    </el-form>
    <!--列表内容 -->
    <div class="articles">
      <div class="title">文章列表</div>
      <div class="article-item">
        <!-- 左侧内容 -->
        <div class="left">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583574111093&di=6f423a08762af8d11ecc47cd25891623&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fdy%2Fslidenews%2F2_img%2F2016_23%2F792_1819513_700462.jpg"
            alt
          />
          <div class="info">
            <span>我爱我的祖国</span>
            <el-tag class="tag">已发表</el-tag>
            <span class="date">2020-06015 10:12:09</span>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <span>
            <i class="el-icon-edit"></i> 修改
          </span>
          <span>
            <i class="el-icon-delete"></i> 删除
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: '5', // 默认是全部状态
        channel_id: null, //
        dateRange: [] // 日期范围
      },
      channels: [],
      list: []
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
    // 文章状态
    // articlesStatus (value) {
    //   switch (value) {
    //     case '1':
    //       return '草稿'
    //       break
    //   }
    // }
  },
  created () {
    this.getChannels()
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
