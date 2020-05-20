const mongoose = require('../libs/db')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    name: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    lastLogin: {
        type: Date,
        default: null
    },
    createTime: {
        type: Date,
        default: new Date()
    },
    updateTime: {
        type: Date,
        default: null
    },
    // 是否可用
    isAlive: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema, 'user')

module.exports = User