<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传素材 -->
    <el-row type="flex" justify="end">
      <!-- action 是必须传入的，不然报错 -->
      <el-upload action="" :http-request="uploadImg">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <!-- 全部素材 -->
      <el-tab-pane label="全部素材" name="all" >
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
              <!-- 放置图片 -->
              <img :src="item.url" alt="">
              <!-- 操作栏 -->
              <el-row class="operate" type="flex" justify="space-around" align="middle">
                <i class='el-icon-star-on' @click="collect(item)" :style="{color:item.is_collected? 'red':'black'}"></i>
                <i class='el-icon-delete-solid' @click="deleteMetarial(item)"></i>
              </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <!-- 收藏素材 -->
     <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
              <!-- 放置图片 -->
              <img :src="item.url" alt="">
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 公共分页组件 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination background
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="prev,pager,next"
      >
        <!-- total page-size  current-page-->
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1, // 默认第一条
        pageSize: 10, // 每页多少条
        total: 1000
      }
    }
  },
  methods: {
    // 收藏素材按钮//哪一个数据,传入id
    collect (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected
        }
      }).then(() => {
        // 成功重新拉取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    // 获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          // 动态传入
          collect: this.activeName === 'collect',
          page: this.page.currentPage, // 页码变量
          per_page: this.page.pageSize // 每页数量
        },
        data: {}
      }).then(result => {
        this.list = result.data.results
        // 赋值总条数
        this.page.total = result.data.total_count // 全部与收藏
      })
    },
    changeTab () {
      // 根据当前的activeName决定获取那个方面
      this.getMaterial()
    },
    // 上传图片
    uploadImg (params) {
      // debugger
      const data = new FormData() // 实例化
      data.append('image', params.file) // 添加上传文件的参数
      // 开始发送请求
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        // 成功，重新拉取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    }
  },
  created () {
    // 获取素材数据
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card{
    width: 200px;
    height: 240px;
    margin: 10px;
    position: relative;
    img{
      width:100%;
      height: 100%;
    }
    .operate{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
       height: 40px;
      background-color: #f5f8f8;
      i{
      font-size: 20px;

      }
    }
  }
}
</style>
