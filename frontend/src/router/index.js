import Router from 'vue-router'
import Vue from 'vue'
import store from '@/store'
import * as types from '@/store/mutation-types'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      name: 'Login',
      path: '/Login',
      alias: '/',
      component: () => import('@/view/System/Login')
    },
    {
      name: 'Home',
      path: '/Home',
      component: () => import('@/view/System/Home'),
      children: [
        {
          name: 'TitleList',
          path: 'titleList',
          component: () => import('@/view/TitleList')
        },
        {
          name: 'Level2TitleList',
          path: 'Level2TitleList',
          component: () => import('@/view/Level2TitleList')
        },
        {
          name: 'Level3TitleList',
          path: 'Level3TitleList',
          component: () => import('@/view/Level3TitleList')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  try {
    // 检查登录状态 start
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || null)
    const vuexLoginStatus = store.getters.isLogined
    if (vuexLoginStatus) {
      if (to.name === 'Login') {
        next({
          name: 'Home'
        })
      } else {
        next()
      }
    } else {
      if (userInfo) {
        store.commit(types.SET_USER_INFO, {
          username: userInfo.username,
          uid: userInfo.uid,
          token: userInfo.token
        })
        next()
      } else {
        if (to.name === 'Login') {
          next()
        } else {
          next({
            name: 'Login'
          })
        }
      }
      // 检查登录状态 end
    }
  } catch (error) {
    alert(error)
    next()
  }
})

export default router
