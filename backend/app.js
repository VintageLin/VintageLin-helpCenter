const Koa = require('koa')
const chalk = require('chalk')
const koabody = require('koa-body')
const koasession = require('koa-session')
const staticServer = require('koa-static')
const logger = require('koa-logger')

const CONSTANT = require('./config/constant')
const errorHandler = require('./middleware/error')
/* 路由引入 start */
const user = require('./routes/user')
const directory = require('./routes/directory')
const article = require('./routes/article')
/* 路由引入 end */

const app = new Koa()

const CONFIG = {
    key: 'koahelp', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 5 * 60 * 1000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
}
app.keys = ['help center']
app.use(logger())
app.use(koasession(CONFIG, app))
app.use(staticServer(__dirname + '/static/'))

app.use(koabody({
    multipart:true,
}))
app.use(user.routes(), user.allowedMethods())
app.use(directory.routes(), directory.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(errorHandler)

app.listen(CONSTANT.PORT, () => {
    console.log(chalk.bgGreen(`服务器运行在 localhost:${CONSTANT.PORT}`))
})