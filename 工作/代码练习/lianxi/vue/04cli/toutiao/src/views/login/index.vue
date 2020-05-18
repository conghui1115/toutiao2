<template>
  <div class="login">
    <!-- 放置一个el-card -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
    <!-- 放置一个表单 :model绑定表单  rules表单规则-->
      <el-form :model='form' :rules="formRules" ref="form">
        <!-- prop 接收字段属性 -->
        <el-form-item style="margin-top:20px" prop="iphoneNumber">
          <!-- v-model 双向绑定数据 -->
          <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="验证码" style="width:65%" v-model="form.code"></el-input>
          <el-button type="primary" style="float:right">发送验证码</el-button>
        </el-form-item>
        <!-- 复选框 用户协议 -->
        <el-form-item prop="checked">
           <el-checkbox v-model="form.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登陆 -->
        <el-form-item>
           <el-button type="primary" style="width:100%" @click='login'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        // 字段
        mobile: '',
        code: '',
        checked: false
      },
      // 自动校验规则
      formRules: {
        iphoneNmber: [
          // required 验证 空 null  undefine 不能验证 false 或者 true,
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '输入6位数字' }
        ],
        checked: [
          // 自定义校验
          {
            validator: function (rules, value, callback) {
              value ? callback() : callback(new Error('请选择协议'))
            }
          }
        ]
      }

    }
  },
  methods: {
    // ref 可以获取原生dom 对象
    // ref 可以获取组对象实例，作用在组件标签，this.$ref获取
    login () {
      // el-form 自带validate()方法
      // 1.回调函数 参数 isOK fields
      // this.$refs.form.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // })
      this.$refs.form.validate().then(() => {
        // 如果成功通过 校验就会到达 then
        this.$axios({
          url: '/authorizations', // 请求接口地址
          method: 'post', // 请求方法
          data: this.form // body请求体参数，获取的是双向数据绑定的手机号和验证码

        })
          .then(result => {
            // 把获取的接口的token 缓存到本地
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/')
          })
          .catch(() => {
            this.$message({
              message: '用户名或者密码错误',
              type: 'error'
            })
            // this.$message.error('用户名或者密码错误')
          })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
  width: 100%;
  height: 100vh;
  background:url(../../assets/img/login_bg.jpg);
  background-size:cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    width: 440px;
    height: 350px;
    .title{
      text-align: center;
      img{
        height: 45px;
      }
    }
  }
}
</style>
