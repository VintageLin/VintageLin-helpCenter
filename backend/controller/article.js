const chalk = require('chalk')
const fs = require('fs')
const { createArticle, modifyArticle, readArticle } = require('../services/article')
const CONSTANT = require('../config/constant')

// 新建内容
async function newContent(ctx) {
  console.log(chalk.bgWhiteBright('新建内容'))
  const { id, content, creator } = ctx.request.body
  const article = await createArticle({
    id,
    creator,
    content
  })
  if (article) {
    return ctx.body = {
      code: CONSTANT.SUCCESS,
      msg: '新建成功'
    }
  }

  ctx.body = {
    code: CONSTANT.FAIL,
    msg: '新建失败'
  }

}

// 内容修改
async function contentChange(ctx) {
  console.log(chalk.bgWhiteBright('修改内容'))
  const { id, content, lastUpdater } = ctx.request.body
  const article = await modifyArticle({
    id,
    lastUpdater,
    content
  })
  if (article) {
    return ctx.body = {
      code: CONSTANT.SUCCESS,
      msg: '修改成功'
    }
  }

  ctx.body = {
    code: CONSTANT.FAIL,
    msg: '修改失败'
  }
}

// 拉取内容 GET
async function readContent(ctx) {
  console.log(chalk.bgWhiteBright('拉取内容'))
  const { id } = ctx.request.query
  const article = await readArticle({
    id
  })
  if (article) {
    return ctx.body = {
      code: CONSTANT.SUCCESS,
      data: {
        content: article.content
      }
    }
  }

  ctx.body = {
    code: CONSTANT.FAIL,
    msg: '暂无内容'
  }
}

// 富文本上传图片
async function fileRecive(ctx) {
  console.log(chalk.bgWhiteBright('富文本上传文件'))
  const file = ctx.request.files.image
  const { uid } = ctx.request.body
  try {
    // 创建可读流 读取接收到的文件
    const reader = fs.createReadStream(file.path)
    // 文件名 路径
    const filename = `${uid}_${new Date() - 0}_${file.name}`
    const filePath = CONSTANT.EDITOR_UPLOAD_PATH + filename
    // 判断是否存在此文件夹没有则创建
    if (!fs.existsSync(CONSTANT.EDITOR_UPLOAD_PATH)) {
      fs.mkdirSync(CONSTANT.EDITOR_UPLOAD_PATH, {
        recursive: true             // 如果是创建多级目录的，则需要打开递归
      })
    }
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)

    ctx.body = {
      code: CONSTANT.SUCCESS,
      data: CONSTANT.EDITOR_URL_OUTPUT + filename,
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
  newContent,
  contentChange,
  readContent,
  fileRecive
}