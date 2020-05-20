const Router = require('koa-router')
const { newContent, contentChange, readContent, fileRecive } = require('../controller/article')

const router = new Router()
router.prefix('/api/article')

// 新建内容
router.post('/newContent', newContent)
// 修改内容
router.post('/modifyContent', contentChange)
// 读取内容
router.get('/getContent', readContent)
// 富文本上传图片
router.post('/imageUpload', fileRecive)

module.exports = router
