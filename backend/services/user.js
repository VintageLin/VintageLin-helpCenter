const User = require('../models/user')

// 新增一条数据
async function createData({ username, password, name, phone, email, isAlive }) {
  try {
    const user = await User.create({
      username,
      password,
      name,
      phone,
      email,
      isAlive
    })
    return user
  } catch (error) {
    console.log(error)
  }
}

// 查找一条用户数据
async function get({ username }) {
  try {
    const user = User.findOne({
      username
    })
    return user
  } catch (error) {
    console.log(error)
  }
}

// 通过用户名密码查找
async function getByUsernamePassword({ username }) {
  try {
    const user = User.findOne({
      username
    })
    return user
  } catch (error) {
    console.log(error)
  }
}

// 获取所有用户列表
async function getALL() {
  try {
    const user = User.find({})
    return user
  } catch (error) {
    console.log(error)
  }
}

// 修改一条数据
async function updateOneData({ username, ...rest }) {
  try {
    const user = User.updateOne({
      username
    }, {
      ...rest
    })
    return user
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  createData,
  get,
  getALL,
  updateOneData,
  getByUsernamePassword
}
