const mongoose = require('mongoose')
let CONSTANT = require('../config/constant')

mongoose.connect(CONSTANT.MONGODB_URL,{
    useNewUrlParser: true,
    poolSize: 5,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log('数据库连接成功')
})

module.exports = mongoose