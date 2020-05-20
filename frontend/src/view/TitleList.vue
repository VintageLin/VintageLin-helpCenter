<template>
  <div class="TitleList">
    <div class="top_title"><strong>一级</strong>标题管理</div>
    <div class="util_bar">
      <a-button type="primary" @click="handleAddLevel1Click">添加</a-button>
      <a-button type="primary" @click="handleRefreshClick">刷新</a-button>
    </div>
    <div class="table">
      <a-table :dataSource="list" :loading="isLoading" :rowKey="(row)=>row.id" :bordered="true" :scroll="{y: 600}">
        <a-table-column title="序号" align="center" width="80px" data-index="idx" :customRender="(text, record, index) => `${index + 1}`"/>
        <a-table-column title="图标" align="center" width="100px" data-index="icon" key="icon" >
          <template slot-scope="icon">
            <div class="icon_image">
              <img :src="icon" alt="">
              <div class="nopic" v-if="!icon">暂无图片</div>
            </div>
          </template>
        </a-table-column>
        <a-table-column title="标题名称" align="center" data-index="title" key="title" />
        <a-table-column title="是否是文章" align="center" width="80px" data-index="isArticle" key="isArticle" >
          <template slot-scope="item">
            {{ item ? '是' : '否' }}
          </template>
        </a-table-column>
        <a-table-column title="下级标题数量" align="center" width="80px" data-index="total" key="total" >
          <template slot-scope="total, scoped">
            {{ scoped.isArticle ? '-' : total }}
          </template>
        </a-table-column>
        <a-table-column title="点赞数(文章)" align="center" width="80px" data-index="article" key="article" >
          <template slot-scope="article, scoped">
            {{ scoped.isArticle ? (article ? article.like : '暂无新建内容') : '-'}}
          </template>
        </a-table-column>
        <a-table-column title="点击量" align="center" width="80px" data-index="clickCount" key="clickCount" >
          <template slot-scope="clickCount">
            {{ clickCount }}
          </template>
        </a-table-column>
        <a-table-column title="操作" align="center" width="240px" key="action">
          <template slot-scope="item">
            <div class="mb5">
              <a-button type="primary" size="small" @click="handleChangeClick(item.id)">修改标题</a-button>
              <a-button type="primary" size="small" @click="handleArticleClick(item.id, true)" v-if="item.isArticle && !item.article">新建内容</a-button>
              <a-button type="primary" size="small" @click="handleArticleClick(item.id, false)" v-if="item.isArticle && item.article">修改内容</a-button>
            </div>
            <div>
              <a-button type="primary" size="small" @click="handleCheckBelowClick(item.id)" v-if="!item.isArticle">查看下级标题</a-button>
              <a-button type="danger" size="small" @click="handleDeleteClick(item)">删除</a-button>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <div>翻页暂时不做</div>
    <ListDeleteDialog v-if="isShowDelete" :id="selectedId" :content="deleteContent" @success="queryList() & (isShowDelete = false)" @cancel="isShowDelete = false"/>
    <AddListDialog v-if="isShowAddDialog" :id="selectedId" :isNewTitle="isAddNewTitle" @cancel="isShowAddDialog = false" @success="handleAddSuccess"></AddListDialog>
    <NewArticle v-if="isShowArticle" :isNewAdded="isArticleNewAdded" :id="selectedId" @success="handleArticleComplete" @cancel="isShowArticle = false"></NewArticle>
  </div>
</template>
<script>
import http from '@/http/http'
import { API } from '@/http/API'
import ListDeleteDialog from '@/components/TitleList/ListDeleteDialog'
import AddListDialog from '@/components/TitleList/AddListDialog'
import NewArticle from '@/components/TitleList/NewArticle'

export default {
  name: 'TitleList',
  components: {
    ListDeleteDialog,
    AddListDialog,
    NewArticle
  },
  data () {
    return {
      list: [],
      isLoading: false,
      isAddNewTitle: true,
      isShowDelete: false,
      deleteContent: '',
      selectedId: '',
      isShowAddDialog: false,
      isShowArticle: false,
      isArticleNewAdded: ''
    }
  },
  created () {
    this.queryList()
  },
  methods: {
    queryList () {
      this.isLoading = true
      http.get(API.GET_LEVEL_ONE).then(res => {
        if (res.code === 1000) {
          this.list = res.data
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
        this.isLoading = false
      })
    },
    handleRefreshClick () {
      this.queryList()
    },
    handleChangeClick (id) {
      this.selectedId = id
      this.isAddNewTitle = false
      this.isShowAddDialog = true
    },
    handleCheckBelowClick (id) {
      this.$router.push({
        path: 'Level2TitleList',
        query: {
          id
        }
      })
    },
    handleAddSuccess () {
      this.isShowAddDialog = false
      this.queryList()
    },
    // 删除
    handleDeleteClick (item) {
      this.isShowDelete = true
      this.selectedId = item.id
      this.deleteContent = item.title
    },
    handleAddLevel1Click () {
      this.isAddNewTitle = true
      this.isShowAddDialog = true
    },
    // 打开文章编辑弹窗
    handleArticleClick (id, type) {
      this.selectedId = id
      this.isArticleNewAdded = type
      this.isShowArticle = true
    },
    handleArticleComplete () {
      this.queryList()
      this.isShowArticle = false
    }
  }
}
</script>
<style scoped>
.top_title { font-size: 20px; }
.util_bar {margin: 10px 0 10px 0;}
.red {color: red;}
.icon_image {width: 65px; height: 65px;}
.icon_image img {width: 100%;}
.nopic {background: #eeeeee; color: #bbb}
.mb5 {margin-bottom: 5px;}
</style>
