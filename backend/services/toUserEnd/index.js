const Directory = require('../../models/directory')
const Article = require('../../models/article')
// const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId

const directoryConfig = {
    id: '$_id',
    title: 1,
    icon: 1,
    isArticle: 1
}

// 查询列表数据
async function getByParentId ({ id }) {
    try {
        const list = await Directory.aggregate([
            {
                $project: {
                    id: '$_id',
                    title: 1,
                    icon: 1,
                    isArticle: 1,
                    _id: 0
                }
            },
            {
                $match: {
                    parentId: id
                }
            }
        ])
        return list
    } catch (error) {
        console.log(error)
    }
}

// 查询文章
async function getArticleById ({ id }) {
    try {
        const article = await Article.findOne({
            directoryId: id
        })
        return article
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getByParentId,
    getArticleById
}