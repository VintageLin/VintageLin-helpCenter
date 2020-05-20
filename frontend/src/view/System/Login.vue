<template>
  <div class="Login">
    <div class="login_box" v-show="!isShowChangePwd && !isShowRegister">
      <p class="title">请登录</p>
      <div class="input_box">
        账号：
        <a-input v-model="username"></a-input>
      </div>
      <div class="input_box">
        密码：
        <a-input v-model="password" type="password"></a-input>
      </div>
      <div class="btn_box">
        <a-button type="primary" :block="true" @click="handleLoginClick" :loading="isLogining">登录</a-button>
      </div>
      <div class="other">
        <a href="javascript:;" @click="handleModifyPwdClick">修改密码</a>
        <a href="javascript:;" @click="handleRegisterClick">注册</a>
      </div>
    </div>
    <change-password v-if="isShowChangePwd" @success="isShowChangePwd = false" @cancel="isShowChangePwd = false"></change-password>
    <register v-if="isShowRegister" @success="isShowRegister = false" @cancel="isShowRegister = false"></register>
  </div>
</template>

<script>
import http from '@/http/http'
import { API } from '@/http/API'
import * as types from '@/store/mutation-types'
import ChangePassword from '@/components/Login/ChangePassword'
import Register from '@/components/Login/Register'

export default {
  name: 'Login',
  components: {
    ChangePassword, Register
  },
  data () {
    return {
      username: '',
      password: '',
      isShowChangePwd: false,
      isLogining: false,
      isShowRegister: false
    }
  },
  methods: {
    handleLoginClick () {
      if (!this.username) {
        this.$message.warning('请输入账号')
        return false
      }
      if (!this.password) {
        this.$message.warning('请输入密码')
        return false
      }
      this.isLogining = true
      http.post(API.LOGIN, {
        username: this.username,
        password: this.password
      }).then(res => {
        this.isLogining = false
        if (res.code === 1000) {
          this.$message.info('登录成功')
          this.$store.commit(types.SET_USER_INFO, {
            uid: res.uid,
            username: this.username
            // token: res.token
          })
          this.$router.push('/Home')
        } else {
          this.$warning({
            title: '提示',
            content: res.msg
          })
        }
      }).catch(() => {
        this.isLogining = false
        this.$error({
          title: '错误',
          content: '网络错误，请稍后再试'
        })
      })
    },
    handleModifyPwdClick () {
      this.isShowChangePwd = true
    },
    handleRegisterClick () {
      this.isShowRegister = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Login {position: relative; height: 100%; background: linear-gradient(-45deg, rgba(185, 176, 43, 0.6), rgba(143, 69, 69, 0.8), rgba(18, 111, 145, 0.6), rgba(27, 134, 109, 0.6)); background-size: 400% 400%; animation: gradientBG 40s ease infinite; }
@keyframes gradientBG {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}
.login_box {width: 320px; height: 260px; background: rgba(57, 164, 252, 0.2); border-radius: 10px; position: absolute; left: 50%; top: 50%; margin: -130px 0 0 -160px; box-shadow: 0 0 20px rgba(0,0,0, 0.5); overflow: hidden;}
.login_box > div { padding: 0 40px; margin-top: 10px;}
.title {font-size: 20px; color: #002; text-align: center; line-height: 30px; margin: 10px 0 0 0 !important; font-weight: bold;}
.btn_box {text-align: center; }
</style>
