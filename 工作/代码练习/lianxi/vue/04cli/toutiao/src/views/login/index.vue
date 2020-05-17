<template>
  <div class="login">
    <!-- 放置一个el-card -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
    <!-- 放置一个表单 -->
      <el-form :model='form' :rules="formRules">
        <el-form-item style="margin-top:20px" prop="iphoneNumber">
          <el-input placeholder="请输入手机号" v-model="form.iphoneNumber"></el-input>
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
           <el-button type="primary" style="width:100%">登录</el-button>
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
        iphoneNumber: '',
        code: '',
        checked: true
      },
      formRules: {}
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
