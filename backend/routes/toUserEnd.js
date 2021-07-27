const Router = require('koa-router')
const { getList, getArticle } = require('../controller/toUserEnd/index')

const router = new Router()


router.get('/indexList', getList)
router.get('/article', getArticle)

module.exports = router