// 请求封装
import axios from 'axios'
import { server } from './host'
import Qs from 'qs'

function Http () {
  let CancelToken = axios.CancelToken
  this.source = CancelToken.source()

  this.client = axios.create({
    baseURL: server,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    cancelToken: this.source.token,
    transformRequest: [function (data) {
      return Qs.stringify(data)
    }]
  })
  // token
  this.token = ''

  // 请求拦截 加token到头部
  this.client.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    // config.headers.Authorization = this.token
    return config
  }, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 响应拦截 这里拦截登录过期
  this.client.interceptors.response.use(response => {
    // 对响应数据做点什么
    
    return response
  }, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
}

// 设置Token
Http.prototype.setToken = function (data) {
  this.token = data
}
// 中止请求
Http.prototype.abortRequest = function (data) {
  this.source.cancel({type: '手动停止请求'})
}

// GET  地址， 参数， 多余配置
Http.prototype.get = function (url, query, restConfig = {}) {
  let current = {}
  return new Promise((resolve, reject) => {
    this.client.get(url,
      Object.assign(current, { params: query }, restConfig)
    )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// POST 同上
Http.prototype.post = function (url, data, restConfig = {}) {
  return new Promise((resolve, reject) => {
    this.client.post(url, data, restConfig)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

let http = new Http()

export default http
