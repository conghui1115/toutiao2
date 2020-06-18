<template>
  <el-card>
    <bread-crumb slot="header">
    <template slot="title" >账户信息</template>
    </bread-crumb>
    <!-- 出错点   el-form 绑定数据用 :model  而不是v-model -->
    <el-form label-width="100px" :model="formData" :rules="rules" ref="userForm">
      <el-form-item label="用户名" prop="name">
        <el-input style="width:30%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input style="width:30%" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" style="width:30%" disable></el-input>
      </el-form-item>
      <el-form-item>
         <el-button type='primary' @click="saveUser">保存</el-button>
       </el-form-item>
    </el-form>
    <img class='head-upload' src="../../assets/img/admire.png" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
        // min 字符最低 长度 max标识最大长度
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    // 获取用户资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data // 将数据赋值给表单数据
      })
    },
    // 保存用户
    saveUser () {
      // 手动校验表单数据
      this.$refs.userForm.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message.success('保存成功')
        }).catch(() => {
          this.$message.error('保存失败')
        })
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
</style>
