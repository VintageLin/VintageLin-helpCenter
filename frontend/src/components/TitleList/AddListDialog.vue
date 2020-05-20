<template>
  <a-modal :title="isNewTitle ? '添加标题' : '修改标题'" centered :closable="false" :keyboard="false" :maskClosable="false" :visible="true" >
    <a-row class="mb10">
      <a-col :span="6" class="leftItem">
        <p><span class="red">*</span>标题：</p>
      </a-col>
      <a-col :span="18">
        <a-input v-model="title" :disabled="isLoading" placeholder="请输入标题"/>
      </a-col>
    </a-row>
    <a-row class="mb10">
      <a-col :span="6" class="leftItem">
        <p>图标：</p>
      </a-col>
      <a-col :span="18">
        <a-upload
          :disabled="isLoading"
          name="icon"
          listType="picture-card"
          class="avatar-uploader"
          :data="rebuildData"
          :showUploadList="false"
          accept="image/*"
          action="/api/directory/imageUpload"
          :beforeUpload="beforeImageUpload"
          @change="handleImageChange"
        >
          <img v-if="imageBase64 || uploadedImageUrl" :src="imageBase64 || uploadedImageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="isUploading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传图标</div>
          </div>
        </a-upload>
      </a-col>
    </a-row>
    <a-row class="mb10" v-if="isNewTitle">
      <a-col :span="6" class="leftItem">
        <p>是否为文章：</p>
      </a-col>
      <a-col :span="18">
        <a-switch v-model="isArticle"/>
      </a-col>
    </a-row>
    <template slot="footer">
      <a-button key="back" :loading="isSubmitting" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="isSubmitting" class="ml20" @click="handleSubmit">确认</a-button>
    </template>
  </a-modal>
</template>

<script>
import http from '@/http/http'
import { API } from '@/http/API'
import getBase64 from '@/utils/getBase64'

export default {
  name: 'AddListDialog',
  props: {
    isNewTitle: {
      type: Boolean,
      required: true
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      isSubmitting: false,
      title: '',
      isArticle: false,
      imageBase64: '',
      uploadedImageUrl: '',
      isUploading: false,
      isLoading: false
    }
  },
  created () {
    !this.isNewTitle && this.queryThisTitle()
  },
  methods: {
    queryThisTitle () {
      const hide = this.$message.loading('请稍后...', 0)
      this.isLoading = true
      http.get(API.GET_ONE_TITLE, {
        id: this.id
      }).then(res => {
        if (res.code === 1000) {
          this.$message.success('读取成功')
          this.title = res.data.title
          this.uploadedImageUrl = res.data.icon
        } else {
          this.$error({
            title: '错误',
            content: res.msg
          })
        }
      }).catch(() => {
        this.$error({
          title: '错误',
          content: '网络错误请稍后再试'
        })
      }).finally(() => {
        hide()
        this.isLoading = false
      })
    },
    // 提交
    handleSubmit () {
      if (!this.title) {
        this.$warning({
          title: '提示',
          content: '标题不能为空'
        })
        return false
      }
      this.isSubmitting = true
      this.isNewTitle ? this.handleNewTitleSubmit() : this.handleModifyTitleSubmit()
    },
    // 新增
    handleNewTitleSubmit () {
      http.post(API.ADD_LV1_TITLE, {
        title: this.title,
        icon: this.uploadedImageUrl,
        isArticle: this.isArticle
      }).then(res => {
        if (res.code === 1000) {
          this.$success({
            title: '提示',
            content: '添加成功'
          })
          this.$emit('success')
        } else {
          this.$warning({
            title: '提示',
            content: res.msg
          })
        }
      }).catch(() => {
        this.$error({
          title: '错误',
          content: '网络错误，请稍后再试'
        })
      }).finally(() => {
        this.isSubmitting = false
      })
    },
    // 修改
    handleModifyTitleSubmit () {
      http.post(API.MODIFY_ONE_TITLE, {
        id: this.id,
        title: this.title,
        icon: this.uploadedImageUrl
      }).then(res => {
        if (res.code === 1000) {
          this.$success({
            title: '提示',
            content: '修改成功'
          })
          this.$emit('success')
        } else {
          this.$warning({
            title: '提示',
            content: res.msg
          })
        }
      }).catch(() => {
        this.$error({
          title: '错误',
          content: '网络错误，请稍后再试'
        })
      }).finally(() => {
        this.isSubmitting = false
      })
    },
    // 图片上传 start
    beforeImageUpload (file) {},
    handleImageChange (info) {
      if (info.file.status === 'uploading') {
        this.isUploading = true
        return
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功`)
        this.uploadedImageUrl = info.file.response.data
        getBase64(info.file.originFileObj, data => {
          this.imageBase64 = data
          this.isUploading = false
        })
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败`)
      }
    },
    // 给上传图片加额外的参数
    rebuildData (obj) {
      return {
        uid: this.$store.state.uid
      }
    },
    // 图片上传 end
    handleCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.ml30 { margin-left: 20px }
.avatar-uploader > .ant-upload {width: 128px;height: 128px;}
.ant-upload img {width: 80px; height: 80px;}
.ant-upload-select-picture-card i {font-size: 32px;color: #999;}
.ant-upload-select-picture-card .ant-upload-text {margin-top: 8px;color: #666;}
.leftItem {height: 34px; line-height: 34px;}
.leftItem > p {text-align: right; padding-right: 15px;}
.mb10 {margin-bottom: 10px;}
.red {color: red;}

</style>
