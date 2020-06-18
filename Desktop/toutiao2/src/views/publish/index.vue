<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!--  表单组件-->
    <el-form style="margin-left:50px" label-width="100px" :model="publishForm" :rules="rules" ref="myForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="publishForm.title" placeholder="请输入标题" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content" style="height:400px">
        <!-- 多行输入 -->
        <quill-editor v-model="publishForm.content" placeholder="请输入您的内容" type="textarea" style="height:300px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" >
        <!-- 单选框组 -->
        <el-radio-group v-model="publishForm.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">多图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 图片选择组件 -->
      <cover-image :list="publishForm.cover.images" @selectTwoImg='receiveImg'></cover-image>
      <el-form-item label="频道"  prop="channel_id">
        <!-- select选择器 -->
        <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
          <!-- 下拉选项 v-for 循环生成 el-option-->
          <!-- label 显示值  value 保存值 -->
          <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发表</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // -1 是自动 0是无图  1 是单图 3 是三图
          images: []// 字符串数组 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
        },
        channel_id: null

      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '文字长度在5-30之间', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 根据id修改文章
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.publishForm = result.data
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then(result => {
        this.channels = result.data.channels // 将频道数据赋值给本地数据
      })
    },
    // 手动校验表单
    // 需要this.$ref获取form实例，调用validate()方法
    publish (params) {
      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params
        this.$axios({
          // 根据id是否存在，两个场景，id存在就是修改文章，id不存在就是发表文章
          url: articleId ? `/articles/${articleId}` : '/articles',
          // 修改文章方法不同
          method: articleId ? 'put' : 'post',
          params: {
            draft: params
          },
          data: this.publishForm
        }).then(() => {
          // 发表文章成功
          this.$message.success('发布成功')
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('发布失败')
        })
      })
    },
    // 封面选择 type 类型
    changeType () {
      // 根据type的值  对 images进行控制
      if (this.publishForm.cover.type === 1) {
        // 单图模式
        this.publishForm.cover.images = ['']
      } else if (this.publishForm.cover.type === 3) {
        // 多图模式
        this.publishForm.cover.images = ['', '', '']
      } else {
        // 无图或者自动 空数组
        this.publishForm.cover.images = []
      }
    },
    // 接收cover-image 传递过来的数据
    receiveImg (url, index) {
      this.publishForm.cover.images.splice(index, 1, url) // 索引 要删除的个数 替换的位置
      // this.publishForm.cover.images[index] = url  自己想的一样的效果
    }

  },
  created () {
    this.getChannels()
    const { articleId } = this.$route.params
    // if (articleId) {
    //   this.getArticleById(articleId)
    // }

    articleId && this.getArticleById(articleId)
  },
  watch: {
    $route: function (to, from) {
      // to 表示去的路由地址对象
      // from 表示旧的路由地址对象
      if (to.params.articleId) {
        // 如果路由地址带参数,获取文章数据
        this.getArticleById(to.params.articleId)
      } else {
        // 如果不存在 应该设置表结构为空
        this.publishForm = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // -1 是自动 0是无图  1 是单图 3 是三图
            images: []// 字符串数组 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
          },
          channel_id: null

        }
      }
    }
  }
}
</script>

<style>
</style>
