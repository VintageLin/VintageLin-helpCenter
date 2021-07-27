const Directory = require('../models/directory')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
// 返回的字段
const listDataConfig = {
  _id: 1,
  title: 1,
  icon: 1,
  parentId: 1,
  isArticle: 1,
  createTime: 1,
  updateTime: 1,
  total: 1,
  clickCount: 1
}
// 拉取数据
async function getAll() {
  try {
    const list = await Directory.find({}, listDataConfig)
    return list
  } catch (error) {
    console.log(error)
  }
}

// 拉取一级数据
async function getLevel1Below({ parentId }) {
  try {
    const list = await Directory.aggregate([
      {
        $lookup: {
          from: 'article',
          localField: '_id',
          foreignField: 'directoryId',
          as: 'article',
        }
      },
      {
        $match: {
          parentId: null
        }
      },
      {
        $project: {
          article: {
            directoryId: 0,
            content: 0,
            creator: 0,
            lastUpdater: 0,
            __v: 0,
            _id: 0,
          },
          __v: 0
        }
      },
      {
        $project: {
          id: '$_id',
          title: 1,
          icon: 1,
          parentId: 1,
          isArticle: 1,
          total: 1,
          createTime: 1,
          updateTime: 1,
          clickCount: 1,
          article: {
            $arrayElemAt: ['$article', 0]
          },
          _id: 0
        }
      }
    ])
    return list
  } catch (error) {
    console.log(error)
  }
}

// 拉取二级数据
async function getLevel2Below({ parentId }) {
  try {
    const list = await Directory.aggregate([
      {
        $lookup: {
          from: 'article',
          localField: '_id',
          foreignField: 'directoryId',
          as: 'article',
        }
      },
      {
        $match: {
          parentId: new ObjectId(parentId)
        }
      },
      {
        $project: {
          article: {
            directoryId: 0,
            content: 0,
            creator: 0,
            lastUpdater: 0,
            __v: 0,
            _id: 0,
          },
          __v: 0
        }
      },
      {
        $project: {
          id: '$_id',
          title: 1,
          icon: 1,
          parentId: 1,
          isArticle: 1,
          total: 1,
          createTime: 1,
          updateTime: 1,
          clickCount: 1,
          article: {
            $arrayElemAt: ['$article', 0]
          },
          _id: 0
        }
      }
    ])
    return list
  } catch (error) {
    console.log(error)
  }
}

// 拉取三级级数据
async function getLevel3({ parentId }) {
  try {
    const list = await Directory.aggregate([
      {
        $lookup: {
          from: 'article',
          localField: '_id',
          foreignField: 'directoryId',
          as: 'article',
        }
      },
      {
        $match: {
          parentId: new ObjectId(parentId)
        }
      },
      {
        $project: {
          article: {
            directoryId: 0,
            content: 0,
            creator: 0,
            lastUpdater: 0,
            __v: 0,
            _id: 0,
          },
          isArticle: 0,
          __v: 0
        }
      },
      {
        $project: {
          id: '$_id',
          title: 1,
          icon: 1,
          parentId: 1,
          total: 1,
          createTime: 1,
          updateTime: 1,
          clickCount: 1,
          article: {
            $arrayElemAt: ['$article', 0]
          },
          _id: 0
        }
      }
    ])
    return list
  } catch (error) {
    console.log(error)
  }
}

// 查询单条
async function queryOne({ id }) {
  try {
    const one = await Directory.findOne({
      _id: id
    })
    return one
  } catch (error) {
    console.log(error)
  }
}

// 增加一条一级
async function addOne({ title, icon, isArticle, parentId }) {
  try {
    const one = await Directory.create({
      title,
      icon,
      isArticle,
      parentId
    })
    return one
  } catch (error) {
    console.log(error)
  }
}

// 删除
async function multipleDeletion({ id }) {
  try {
    const one = await Directory.deleteMany({
      _id: {
        $in: id
      }
    })
    return one
  } catch (error) {
    console.log(error)
  }
}

// 修改一条
async function updateOneById({ id, ...rest }) {
  try {
    const one = await Directory.findByIdAndUpdate(id, {
      ...rest
    })
    return one
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAll,
  getLevel1Below,
  getLevel2Below,
  getLevel3,
  addOne,
  queryOne,
  multipleDeletion,
  updateOneById
}