// 是否已登录
export default {
  isLogined: state => {
    return state.username && state.uid
  }
}
