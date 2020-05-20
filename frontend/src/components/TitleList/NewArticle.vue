<template>
  <a-modal width="800px" :visible="true" centered :closable="false" :keyboard="false" :maskClosable="false" :destroyOnClose="true" :title="isNewAdded ? '新建内容' : '修改内容'">
    <quill-editor v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
    </quill-editor>
    <a-upload
      ref="uploadComp"
      name="image"
      accept="image/*"
      :data="rebuildData"
      :multiple="false"
      :show-upload-list="false"
      action="/api/article/imageUpload"
      @change="handleUploadChange"
    >
      <a-button ref="uploadComp">上传图片</a-button>
    </a-upload>
    <template slot="footer">
      <a-button key="back" :loading="isSubmitting" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="isSubmitting" class="ml20" @click="handleOk">确认</a-button>
    </template>
  </a-modal>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import http from '@/http/http'
import { API } from '@/http/API'

export default {
  name: 'NewArticle',
  props: {
    id: {
      type: String,
      required: true
    },
    isNewAdded: {
      type: Boolean,
      required: true
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.lastUpdater = this.$store.state.username
    if (!this.isNewAdded) {
      this.queryContent()
    }
  },
  mounted () {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.editor.getModule('toolbar').addHandler('image', this.imgUploadHandler)
  },
  data () {
    return {
      content: '',
      editorOption: {
        // some quill options
        placeholder: '请输入内容'
      },
      uploadedImageUrl: '',           // 上传图片成功后的地址
      lastUpdater: '',                // 操作人员
      isSubmitting: false
    }
  },
  methods: {
    // 查询内容
    queryContent () {
      const hide = this.$message.loading('正在读取内容中...', 0)
      http.get(API.READ_ARTICLE, {
        id: this.id
      }).then(res => {
        if (res.code === 1000) {
          this.$message.success('读取成功')
          this.content = res.data.content
        } else {
          this.$warning({
            title: '提示',
            content: res.msg
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$error({
          title: '错误',
          content: '网络错误，请稍后再试',
          centered: true
        })
      }).finally(() => {
        hide()
      })
    },
    // 新增
    newArticle (content) {
      this.isSubmitting = true
      http.post(API.NEW_ARTICLE, {
        content: this.content,
        id: this.id,
        creator: this.lastUpdater
      }).then(res => {
        if (res.code === 1000) {
          this.$emit('success', this.content)
        } else {
          this.$warning({
            title: '提示',
            content: res.msg,
            centered: true
          })
        }
      }).catch(() => {
        this.$error({
          title: '错误',
          content: '网络错误，请稍后再试',
          centered: true
        })
      }).finally(() => {
        this.isSubmitting = false
      })
    },
    // 修改
    modifyArticle (content) {
      this.isSubmitting = true
      http.post(API.MODIFY_ARTICLE, {
        content: this.content,
        id: this.id,
        lastUpdater: this.lastUpdater
      }).then(res => {
        if (res.code === 1000) {
          this.$emit('success', this.content)
        } else {
          this.$warning({
            title: '提示',
            content: res.msg
          })
        }
      }).catch(() => {
        this.$error({
          title: '错误',
          content: '网络错误，请稍后再试',
          centered: true
        })
      }).finally(() => {
        this.isSubmitting = false
      })
    },
    // 提交内容
    handleSubmitContent (content) {
      if (this.isNewAdded) {
        this.newArticle()
      } else {
        this.modifyArticle()
      }
    },
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
    },
    handleOk () {
      if (!this.content) {
        this.$confirm({
          title: '提示',
          content: h => <div>当前内容为空，确认继续么？</div>,
          onOk: () => {
            this.handleSubmitContent()
          },
          onCancel () {}
        })
        return false
      }
      this.handleSubmitContent()
    },
    handleCancel () {
      this.$emit('cancel', false)
    },
    handleUploadChange (info) {
      console.log(info)
      if (info.file.status === 'uploading') {
        this.isUploading = true
        return
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功`)
        this.uploadedImageUrl = info.file.response.data
        let length = this.editor.getSelection().index
        // 插入图片 response.data.url为服务器返回的图片地址
        this.editor.insertEmbed(length, 'image', this.uploadedImageUrl)
        // 调整光标到最后
        this.editor.setSelection(length + 1)
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
    imgUploadHandler (state) {
      console.log(this.$refs.uploadComp)
      this.addRange = this.editor.getSelection()
      document.querySelector('.ant-upload').querySelector('.ant-upload').children[0].click()
      // if (state) {
      //   fileInput.click() // 加一个触发事件
      // }
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>
<style scoped>
/deep/ .ql-editor{min-height:300px;}
.ml20 {margin-left: 20px}
/deep/ .ql-editor img {vertical-align: initial !important ;}
</style>
