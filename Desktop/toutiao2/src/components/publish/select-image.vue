<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="上传素材" name="one" >
      <div class="selectList">
        <el-card v-for="(item,index) in list" :key="index" class="myCard">
          <img :src="item.url" alt  @click='clickImg(item.url)'/>
        </el-card>
      </div>
      <el-row style="height:60px" type="flex" justify="center" align="middle">
        <el-pagination
          background
          layout="prev,pager,next"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          :total="page.total"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="自定义素材" name="two">
      <el-upload action="" class="upload-img" :http-request="uploadImg">
        <i class="el-icon-plus"> </i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'one',
      list: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 1000
      }
    }
  },
  methods: {
    // 得到所有图片素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          per_page: this.page.pageSize,
          page: this.page.currentPage
        }
      }).then(result => {
        // debugger
        this.list = result.data.results // 获取全部素材的数据
        this.page.total = result.data.total_count
      })
    },
    // 点击分页获取新数据
    changePage (newPage) {
      this.page.currentPage = newPage // 复制新页码
      this.getAllImg() // 从新获取数据
    },
    // 点击图片
    clickImg (url) {
      // 需要将url参数传入到上层组件
      // 在脚手架中 自定义事件名可以大小写通用
      this.$emit('selectOneImg', url)
    },
    // 自定义上传
    uploadImg (params) {
      const data = new FormData() // 实例化
      data.append('image', params.file) // 添加上传文件的参数
      // 开始发送请求
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        // 成功 返回url结果 向父组件传值
        this.$emit('selectOneImg', result.data.url)
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.selectList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .myCard {
    width: 150px;
    height: 150px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload-img{
  display:flex;
  justify-content: center;
  i{
    font-size: 20px;
    padding: 50px;
    border: 2px dashed #ccc;
    border-radius: 10px;
    color: blueviolet;
  }
}
</style>
