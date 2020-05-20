import * as types from './mutation-types'

export default {
  [types.CLEAN_USER_INFO] (state) {
    state.username = ''
    state.uid = ''
    state.token = ''
    try {
      window.sessionStorage.removeItem('userInfo')
    } catch (error) {
      alert(error)
    }
  },
  [types.SET_USER_INFO] (state, payload) {
    state.username = payload.username
    state.token = payload.token
    state.uid = payload.uid
    try {
      window.sessionStorage.setItem('userInfo', JSON.stringify({
        username: payload.username,
        token: payload.token,
        uid: payload.uid
      }))
    } catch (error) {
      alert(error)
    }
  }
}
