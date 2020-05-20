<template>
  <div class="ChangePassword">
    <div class="change_box">
      <p class="title">修改密码</p>
      <div class="input_box">
        账号：
        <a-input v-model.trim="username"></a-input>
      </div>
      <div class="input_box">
        旧密码：
        <a-input v-model.trim="password" type="password"></a-input>
      </div>
      <div class="input_box">
        新密码：
        <a-input v-model.trim="newPassword" type="password"></a-input>
      </div>
      <div class="input_box">
        重复新密码：
        <a-input v-model.trim="repeatPassword" type="password"></a-input>
      </div>
      <div class="btn_box">
        <a-button @click="handleCancelClick" :loading="isSubmiting">取消</a-button>
        <a-button type="primary" @click="handleSubmitClick" :loading="isSubmiting">修改</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/http/http'
import { API } from '@/http/API'

export default {
  name: 'ChangePassword',
  data () {
    return {
      username: '',
      password: '',
      newPassword: '',
      repeatPassword: '',
      isSubmiting: false
    }
  },
  methods: {
    handleSubmitClick () {
      if (!this.username) {
        this.$message.warning('请输入账号')
        return false
      }
      if (!this.password) {
        this.$message.warning('请输入旧密码')
        return false
      }
      if (!this.newPassword) {
        this.$message.warning('请输入新密码')
        return false
      }
      if (!this.repeatPassword) {
        this.$message.warning('请再次输入新密码')
        return false
      }
      if (this.repeatPassword !== this.newPassword) {
        this.$message.warning('请确认两次输入的新密码一致')
        return false
      }
      this.isSubmiting = true
      http.post(API.CHANGE_PASSWORD, {
        username: this.username,
        password: this.password,
        oldPwd: this.password,
        newPwd: this.newPassword
      }).then(res => {
        this.isSubmiting = false
        if (res.code === 1000) {
          this.$success({
            title: '成功',
            content: '密码修改成功',
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
    handleCancelClick () {
      this.$emit('cancel')
    }
  }
}
</script>
<style scoped>
.change_box {width: 320px; height: 354px; background: rgba(57, 164, 252, 0.2); border-radius: 10px; position: absolute; left: 50%; top: 50%; margin: -177px 0 0 -160px; box-shadow: 0 0 20px rgba(0,0,0, 0.5); overflow: hidden;}
.change_box > div { padding: 0 40px; margin-top: 10px;}
.title {font-size: 20px; color: #002; text-align: center; line-height: 30px; margin: 10px 0 0 0 !important; font-weight: bold;}
.btn_box {text-align: center; }
</style>
