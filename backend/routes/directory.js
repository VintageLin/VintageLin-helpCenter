const Router = require('koa-router')
const { getTopTitles, getSecondTitles, getThirdTitles, getOneTitle, addLv1Title, addLv2Title, addLv3Title, modifyOneTitle, deleteOneTitle, fileRecive } = require('../controller/directory')

const router = new Router()
router.prefix('/api/directory')
/* 给后台管理 */
// 拉取一级列表/文章
router.get('/getLevelOne', getTopTitles)
// 拉取二级列表/文章
router.get('/getLevelTwo', getSecondTitles)
// 拉取三级文章
router.get('/getLevelThree', getThirdTitles)
// 查询标题
router.get('/getOneTitle', getOneTitle)
// 添加一级标题/文章
router.post('/addLv1Title', addLv1Title)
// 添加二级标题/文章
router.post('/addLv2Title', addLv2Title)
// 添加三级文章
router.post('/addLv3Title', addLv3Title)
// 删除标题
router.post('/deleteOneTitle', deleteOneTitle)
// 修改标题
router.post('/modifyOneTitle', modifyOneTitle)

// 图片上传
router.post('/imageUpload', fileRecive)

module.exports = router
