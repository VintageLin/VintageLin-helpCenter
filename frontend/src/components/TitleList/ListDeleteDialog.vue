<template>
  <a-modal title="提示" centered :closable="false" :maskClosable="false" :visible="true" @ok="handleDeleteConfirm">
    <p>确认删除： {{ content }} ？</p>
    <template slot="footer">
      <a-button :loading="isDeleting" @click="handleCancel">取消</a-button>
      <a-button type="primary" :loading="isDeleting" @click="handleDeleteConfirm">确认</a-button>
    </template>
  </a-modal>
</template>

<script>
import http from '@/http/http'
import { API } from '@/http/API'

export default {
  name: '',
  props: {
    content: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isDeleting: false
    }
  },
  methods: {
    handleDeleteConfirm () {
      this.isDeleting = true
      http.post(API.DELETE_TITLE, {
        id: this.id
      }).then(res => {
        this.isDeleting = false
        this.isShowDelete = false
        if (res.code === 1000) {
          this.deleteId = ''
          this.deleteContent = ''
          this.$emit('success')
        } else {
          this.$error({
            title: '错误',
            content: res.msg
          })
        }
      }).catch(() => {
        this.isDeleting = false
        this.isShowDelete = false
        this.$error({
          title: '错误',
          content: '网络错误请稍后再试'
        })
      })
    },
    handleCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>
