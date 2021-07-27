const mongoose = require('../libs/db')

const articleSchema = mongoose.Schema({
  directoryId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  content: {
    type: String,
    default: ''
  },
  createTime: {
    type: Date,
    default: new Date()
  },
  updateTime: {
    type: Date,
    defaule: null
  },
  like: {
    type: Number,
    default: 0
  },
  creator: {
    type: String,
    require: true
  },
  lastUpdater: {
    type: String,
    default: ''
  }
})

const article = mongoose.model('Article', articleSchema, 'article')

module.exports = article