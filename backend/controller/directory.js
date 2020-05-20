const chalk = require('chalk')
let _ = require('lodash')
const fs = require('fs')
const { getAll, queryOne, getLevel1Below, getLevel2Below, getLevel3, addOne, multipleDeletion, updateOneById } = require('../services/directory')
const { createArticle, queryArticles } = require('../services/article')
const CONSTANT = require('../config/constant')

const evalBoolean = (target) => {
    if (target === 'false') return false
    if (target === 'true') return true
}

// 拉取一级目录
async function getTopTitles (ctx) {
    console.log(chalk.bgWhiteBright('拉取一级列表'))
    const allList = await getLevel1Below({
        parentId: null
    })
    if(allList) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            data: allList
        }
    }
    ctx.body = {
        code: CONSTANT.FAIL,
        msg: '拉取失败'
    }    
}

// 拉取二级目录
async function getSecondTitles (ctx) {
    console.log(chalk.bgWhiteBright('拉取二级列表'))
    const { id } = ctx.request.query
    const allList = await getLevel2Below({
        parentId: id
    })

    if(allList) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            data: allList
        }
    }
    ctx.body = {
        code: CONSTANT.fail,
        data: '拉取失败'
    }
}

// 拉取三级 只有文章
async function getThirdTitles (ctx) {
    console.log(chalk.bgWhiteBright('拉取三级列表'))
    const { id } = ctx.request.query
    const allList = await getLevel3({
        parentId: id
    })

    if(allList) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            data: allList
        }
    }
    ctx.body = {
        code: CONSTANT.fail,
        data: '拉取失败'
    }
    
}

// 查询某个标题
async function getOneTitle (ctx) {
    console.log(chalk.bgWhiteBright('查询一条标题'))
    const { id } = ctx.request.query
    const one = await queryOne({
        id
    })
    if (one) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            data: one,
            msg: '查询成功',
        }
    }
    ctx.body = {
        code: CONSTANT.FAIL,
        msg: '查无此条'
    }
}

// 添加一级标题
async function addLv1Title (ctx) {
    console.log(chalk.bgWhiteBright('添加一级标题/文章'))
    const { title, icon, isArticle } = ctx.request.body

    const isAdd = await addOne({
        title,
        icon,
        isArticle
    })

    if (isAdd) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            msg: '添加成功'
        }
    }
    ctx.body = {
        code: CONSTANT.SUCCESS,
        data: '添加失败'
    }
}

// 添加二级标题
async function addLv2Title (ctx) {
    console.log(chalk.bgWhiteBright('添加二级标题/文章'))
    const { title, icon, isArticle, parentId } = ctx.request.body

    const isAdd = await addOne({
        title,
        icon,
        isArticle,
        parentId
    })

    if (isAdd) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            msg: '添加成功'
        }
    }
    ctx.body = {
        code: CONSTANT.SUCCESS,
        data: '添加失败'
    }
}

// 添加三级
async function addLv3Title (ctx) {
    console.log(chalk.bgWhiteBright('添加三级标题/文章'))
    const { title, icon, parentId } = ctx.request.body

    const isAdd = await addOne({
        title,
        icon,
        isArticle: true,
        parentId
    })

    if (isAdd) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            msg: '添加成功'
        }
    }
    ctx.body = {
        code: CONSTANT.SUCCESS,
        data: '添加失败'
    }
}


// 删除标题
async function deleteOneTitle (ctx) {
    console.log(chalk.bgWhiteBright('删除标题'))
    const { id } = ctx.request.body

    const isDelete = await multipleDeletion({
        id: id.split(',')
    })
    if (isDelete.deletedCount > 0) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            msg: '删除成功'
        }
    } else if (isDelete.deletedCount === 0) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            msg: '删除失败，未找到所选标题'
        }
    }
    ctx.body = {
        code: CONSTANT.FAIL,
        msg: '删除失败'
    }
}

// 修改标题
async function modifyOneTitle (ctx) {
    console.log(chalk.bgWhiteBright('修改标题'))
    const { id, title, icon } = ctx.request.body
    const isModify = await updateOneById({
        id,
        title,
        icon,
        updateTime: new Date()
    })
    if (isModify) {
        return ctx.body = {
            code: CONSTANT.SUCCESS,
            msg: '修改成功'
        }
    }
    ctx.body = {
        code: CONSTANT.FAIL,
        msg: '查无此标题'
    }
}

// 上传图标
async function fileRecive (ctx) {
    console.log(chalk.bgWhiteBright('上传文件'))
    const file = ctx.request.files.icon
    const { uid } = ctx.request.body
    try {
        // 创建可读流 读取接收到的文件
        const reader = fs.createReadStream(file.path)
        // 文件名 路径
        const filename = `${ uid }_${new Date() - 0}_${file.name}`
        const filePath = CONSTANT.ICON_UPLOAD_PATH + filename
        // 判断是否存在此文件夹没有则创建
        if (!fs.existsSync(CONSTANT.ICON_UPLOAD_PATH)) {
            fs.mkdirSync(CONSTANT.ICON_UPLOAD_PATH, {
                recursive: true             // 如果是创建多级目录的，则需要打开递归
            })
        }
        // 创建可写流
        const upStream = fs.createWriteStream(filePath)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)

        ctx.body = {
            code: CONSTANT.SUCCESS,
            data: CONSTANT.ICON_URL_OUPUT + filename,
            msg: '上传成功'
        }
    } catch (error) {
        ctx.body = {
            code: CONSTANT.FAIL,
            msg: '上传失败\n' + error.message
        }
    }
}

module.exports = {
    getTopTitles,
    getSecondTitles,
    getThirdTitles,
    addLv1Title,
    addLv2Title,
    addLv3Title,
    getOneTitle,
    modifyOneTitle,
    deleteOneTitle,
    fileRecive
}