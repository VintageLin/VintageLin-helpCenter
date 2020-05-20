const Article = require('../models/article')

// 创建一个新的
async function createArticle ({ id, content, creator }) {
    try {
        const article = await Article.create({
            directoryId: id,
            content,
            creator,
        })
        return article
    } catch (error) {
        console.log(error)
    }
}

// 修改一篇文章
async function modifyArticle ({ id, content, lastUpdater }) {
    try {
        const article = await Article.update({
            directoryId: id
        }, {
            content,
            updateTime: new Date(),
            lastUpdater
        })
        return article
    } catch (error) {
        console.log(error)
    }
}

// 查看内容
async function readArticle ({ id }) {
    try {
        const article = await Article.findOne({
            directoryId: id
        })
        return article
    } catch (error) {
        console.log(error)
    }
}

// 查询多个
async function queryArticles ({ id }) {
    try {
        const articles = await Article.find({
            directoryId: {
                $in: id
            }
        })
        return articles
    } catch (error) {
        console.log(error)
    }
}

// 增加点击数
async function count ({ id }) {
    try {
        const article = await Article.update({
            directoryId: id
        }, {
            $inc: {
                clickCount: 1
            }
        })
        return article
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createArticle,
    modifyArticle,
    readArticle,
    queryArticles,
    count,
}