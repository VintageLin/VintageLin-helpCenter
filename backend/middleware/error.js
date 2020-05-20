const error = async (ctx, next) => {
    try {
        if (ctx.status === 401) {
            ctx.status = 200;
            ctx.body = {
                code: 9999,
                msg: "token无效"
            }
        }
        await next()
    } catch (err) {
        ctx.body = {
            msg: '内部错误',
            error: err.message,
            code: 9999
        }
    }
}

module.exports = error