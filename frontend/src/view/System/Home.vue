<template>
  <a-layout class="fullWindow">
    <a-layout-header class="header">
      <div class="topText">
        <span class="big_title">问题管理</span>
      </div>
      <div class="topBtns">
        <a-button class="logout" type="danger" @click="handleLogoutClick">注销</a-button>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="currentRoute" @click="handleMenuItemClick">
          <a-menu-item key="TitleList">
            <router-link :to="{ name: 'TitleList' }">标题管理</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import * as types from '@/store/mutation-types'
export default {
  name: 'Home',
  data () {
    return {
      currentRoute: ['']
    }
  },
  watch: {
    '$route' (val) {
      this.currentRoute[0] = val.name
    }
  },
  created () {
    this.currentRoute[0] = this.$route.name
  },
  methods: {
    handleMenuItemClick ({ key }) {},
    handleLogoutClick () {
      this.$store.commit(types.CLEAN_USER_INFO)
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fullWindow {height: 100%;}
.header {background: rgb(31, 173, 255);}
.big_title {font-size: 22px; font-weight: bold;}
.topText {float: left; height: 100%;}
.topBtns {float: right; height: 100%;}
.content {padding: 10px 20px; background: #fff;}
</style>
