<template>
  <div class="Register">
    <div class="Register_box">
      <p class="title">注册新用户</p>
      <div class="input_box">
        账号：
        <a-input v-model.trim="username"></a-input>
      </div>
      <div class="input_box">
        密码：
        <a-input v-model.trim="password" type="password"></a-input>
      </div>
      <div class="input_box">
        重复新密码：
        <a-input v-model.trim="repeatPassword" type="password"></a-input>
      </div>
      <div class="input_box">
        姓名：
        <a-input v-model.trim="name" type="text"></a-input>
      </div>
      <div class="input_box">
        手机：
        <a-input v-model.trim="phone" type="text"></a-input>
      </div>
      <div class="input_box">
        邮箱：
        <a-input v-model.trim="email" type="text"></a-input>
      </div>
      <div class="input_box code">
        <p>邮箱验证码：</p>
        <div>
          <a-input v-model.trim="code" type="text"></a-input>
        </div>
        <div>
          <a-button v-if="times > 0" :disabled="times > 0">{{ times }}s后重发</a-button>
          <a-button type="primary" v-else @click="handleSendEmailCodeClick" :loading="isSendingEmail">{{ isSendingEmail ? '发送中...' : '发送验证码'}}</a-button>
        </div>
      </div>
      <div class="btn_box">
        <a-button @click="handleCancelClick" :loading="isSubmiting">取消</a-button>
        <a-button type="primary" @click="handleSubmitClick" :loading="isSubmiting">注册</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/http/http'
import { API } from '@/http/API'

export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      name: '',
      phone: '',
      email: '',
      code: '',
      isSendingEmail: false,
      isSubmiting: false,
      times: 0
    }
  },
  methods: {
    handleSubmitClick () {
      if (!this.username) {
        this.$message.warning('请输入账号')
        return false
      }
      if (!this.password) {
        this.$message.warning('请输入密码')
        return false
      }
      if (!this.repeatPassword) {
        this.$message.warning('请再次输入新密码')
        return false
      }
      if (this.repeatPassword !== this.password) {
        this.$message.warning('请确认两次输入的密码一致')
        return false
      }
      if (!this.name) {
        this.$message.warning('请输入姓名')
        return false
      }
      if (!this.phone) {
        this.$message.warning('请输入手机')
        return false
      }
      if (!this.email) {
        this.$message.warning('请输入邮箱')
        return false
      }
      if (!this.code) {
        this.$message.warning('请输入验证码')
        return false
      }
      this.isSubmiting = true
      http.post(API.REGISTER, {
        username: this.username,
        password: this.password,
        name: this.name,
        phone: this.phone,
        email: this.email,
        code: this.code
      }).then(res => {
        this.isSubmiting = false
        if (res.code === 1000) {
          this.$success({
            title: '成功',
            content: '账号注册成功',
            onOk: () => {
              this.$emit('success')
            }
          })
        } else {
          this.$error({
            title: '错误',
            content: res.msg
          })
        }
      }).catch(() => {
        this.isSubmiting = false
        this.$error({
          title: '错误',
          content: '网络错误请稍后再试'
        })
      })
    },
    handleSendEmailCodeClick () {
      if (!this.username) {
        this.$message.warning('请输入账号')
        return false
      }
      if (!this.email) {
        this.$message.warning('请输入邮箱')
        return false
      }
      this.isSendingEmail = true
      http.post(API.SEND_MAIL_CODE, {
        username: this.username,
        email: this.email
      }).then(res => {
        this.isSendingEmail = false
        if (res.code === 1000) {
          this.$message.info('邮件验证码发送成功')
          this.btnCountDown()
        } else {
          this.$error({
            title: '错误',
            content: res.msg
          })
        }
      }).catch(() => {
        this.isSendingEmail = false
        this.$error({
          title: '错误',
          content: '网络错误请稍后再试'
        })
      })
    },
    handleCancelClick () {
      this.$emit('cancel')
    },
    btnCountDown () {
      this.times = 60
      let timer = setInterval(() => {
        this.times--
        if (this.times === 0) {
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>
<style scoped>
.Register_box {width: 340px; height: 550px; background: rgba(57, 164, 252, 0.2); border-radius: 10px; position: absolute; left: 50%; top: 50%; margin: -275px 0 0 -170px; box-shadow: 0 0 20px rgba(0,0,0, 0.5); overflow: hidden;}
.Register_box > div { padding: 0 40px; margin-top: 10px;}
.title {font-size: 20px; color: #002; text-align: center; line-height: 30px; margin: 10px 0 0 0 !important; font-weight: bold;}
.code:after {content: ' '; display: block; clear: both;}
.code > div:nth-of-type(1) {float: left; width: 145px;}
.code > div:nth-of-type(2) {float: right; width: 105px; text-align: right;}

.btn_box {text-align: center; margin-top: 10px; }
</style>
