const chalk = require('chalk')
const CONSTANT = require('../../config/constant')
const { getByParentId, getArticleById } = require('../../services/toUserEnd/index')

// 拉取列表
async function getList(ctx) {
    console.log(chalk.bgWhiteBright('用户端拉取列表'))
    const { id } = ctx.request.query

    const list = await getByParentId({
        id: id ? id : null
    })
    if (list) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            data: list
        }
    }
    ctx.body = {
        code: CONSTANT.FAIL,
        msg: '拉取失败'
    }
}

// 拉取文章
async function getArticle (ctx) {
    console.log(chalk.bgWhiteBright('用户端拉取文章'))
    const { id } = ctx.request.query
    
    const article = await getArticleById({ id })
    if (article) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            data: article
        }
    }
    ctx.body = {
        code: CONSTANT.FAIL,
        msg: '拉取失败'
    }
}

module.exports = {
    getList,
    getArticle
}