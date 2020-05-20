const Router = require('koa-router')
const { register, login, emailVerify } = require('../controller/user')

const router = new Router()
router.prefix('/api/user')

// 注册
router.post('/register', register)
// 登录
router.post('/login', login)
// 邮箱验证码
router.post('/emailCode', emailVerify)
// 注销
// router.post('/logout')

module.exports = router
