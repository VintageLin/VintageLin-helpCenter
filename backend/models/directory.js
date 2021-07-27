const mongoose = require('../libs/db')

const directorySchema = mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  isArticle: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    default: 0
  },
  createTime: {
    type: Date,
    default: new Date()
  },
  updateTime: {
    type: Date,
    default: null
  },
  clickCount: {
    type: Number,
    default: 0
  }
})


const directory = mongoose.model('Directory', directorySchema, 'directory')

module.exports = directory