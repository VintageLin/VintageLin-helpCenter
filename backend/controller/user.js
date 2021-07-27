const chalk = require('chalk')
const { createData, get, getByUsernamePassword, updateOneData } = require('../services/user')
const generate6Number = require('../utils/generate6Number')
const CONSTANT = require('../config/constant')
const mailer = require('../utils/mailer')

let emailExpireTime = 60 * 1000
// 创建账户
async function register(ctx) {
  console.log(chalk.bgWhiteBright('创建账户'))
  const { username, password, phone, email, name, code } = ctx.request.body
  const { sessionUsername, mailExpired, number } = ctx.session
  const isRegistered = await get({ username })
  let remain = parseInt((mailExpired - new Date()) / 1000)

  if (username !== sessionUsername) {
    console.log(chalk.red('用户名跟session中的不一致'))
    return ctx.body = {
      code: CONSTANT.FAIL,
      msg: '验证码错误'
    }
  }

  if (code === number && remain > 0) {
    if (isRegistered) {
      return ctx.body = {
        code: CONSTANT.FAIL,
        msg: '该用户名已被注册'
      }
    }
    const doRegister = createData({
      username,
      password,
      phone,
      email,
      name,
      isAlive: true
    })
    if (doRegister) {
      console.log(chalk.bgWhiteBright(`用户 ${username} 创建成功`))
      return ctx.body = {
        code: CONSTANT.SUCCESS,
        msg: '注册成功'
      }
    }
    ctx.body = {
      code: CONSTANT.FAIL,
      msg: '注册失败'
    }
  } else {
    ctx.body = {
      code: CONSTANT.FAIL,
      msg: '邮件验证码已过期'
    }
  }

}

// 登录
async function login(ctx) {
  console.log(chalk.bgWhiteBright('登录账户'))
  const { username, password } = ctx.request.body

  const isExisted = await getByUsernamePassword({
    username
  })
  if (password === isExisted.password) {
    console.log(chalk.bgWhiteBright(`用户 ${username} 登录成功`))
    let updateLoginStatus = await updateOneData({
      username,
      lastLogin: new Date()
    })
    return ctx.body = {
      code: CONSTANT.SUCCESS,
      uid: isExisted._id,
      msg: '登录成功'
    }
  }
  return ctx.body = {
    code: CONSTANT.FAIL,
    msg: '请检查账户密码'
  }

}

// 邮件验证码
async function emailVerify(ctx) {
  let number = generate6Number()
  let mailExpired = new Date() - 0 + emailExpireTime     // 60s
  const { username, email } = ctx.request.body
  console.log(`发送邮件验证码 ${number}`)

  const sendMail = await mailer({
    sendTo: email,
    subject: '验证码',
    content: `<p>您的验证码是：<strong>${number}</strong></p>`
  }).catch(() => {
    ctx.body = {
      code: CONSTANT.FAIL,
      msg: '邮件验证码发送失败，请稍后再试'
    }
  })
  if (sendMail.accepted.length > 0) {
    // console.log(`发送验证码邮件到 ${sendMail} `)
    ctx.session.mailExpired = mailExpired
    ctx.session.number = number
    ctx.session.sessionUsername = username
    ctx.body = {
      code: CONSTANT.SUCCESS,
      msg: '邮件验证码发送成功，请注意查收'
    }
  }
}

module.exports = {
  register,
  login,
  emailVerify
}
