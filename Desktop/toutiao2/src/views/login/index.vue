<template>
  <div class="login">
    <!-- 放置一个el-card组件 -->
    <el-card class='login-card'>
      <!-- 放置标题图片 -->
      <div class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 放置表单 -->
      <el-form v-bind:model="loginForm" :rules="loginRules" ref="loginForm">
        <!-- 表单域 里面   放置 input/select/checkbox 相当于一行-->
        <el-form-item prop="mobile">
           <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="code">
          <el-input style="width:65%" placeholder="验证码" v-model="loginForm.code"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <!-- 复选框 -->
          <el-checkbox  v-model="loginForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
      // 登录表单数据
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '输入6位数字验证码' }
        ],
        checked: [
          {
            validator: function (rules, value, callback) {
              value ? callback() : callback(new Error('必须同意条款'))
            }
          }
        ]
      }
    }
  },
  methods: {
    // 点击登录自动校验
    login () {
      // 第一种
      // this.$refs.loginForm.validate(function (isOk) {
      //   if (isOk) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验不通过')
      //   }
      // })
      // 通过校验后，应该做的事情，=》调用接口  看看手机号是否正常
      this.$refs.loginForm.validate().then(() => {
        // 写法
        // this.$axios.get/post/put/delete("")
        this.$axios({
          url: '/authorizations',
          method: 'post',
          data: this.loginForm
        }).then(result => {
          // 拿到后台的token 钥匙 ，存在本地
          window.localStorage.setItem('user-token', result.data.data.token)
          // 验证完跳转首页
          this.$router.push('/home')
        }).catch(() => {
          // 如果填写不正确，则弹出提示信息
          this.$message({ message: '用户名或者密码错误', type: 'error' })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form-item{
        text-align: left;
      }
.login  {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 440px;
      height: 350px;
      .title {
        text-align: center;
        margin-bottom: 30px;
        img {
          height: 45px;
        }
      }
    }
  }

</style>
