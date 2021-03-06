import axios from 'axios'
import { Message, Loading } from 'element-ui'
import Auth from '@/assets/auth'
import basicConfig from '@/assets/basic-config'
// import qs from 'qs'

let loadingInstance
const SUCCESS_STATUS = 'OK'
/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  function (config) {
    // 如果已登录，在请求头中加入token
    if (Auth.getToken()) {
      config.headers.Authorization = Auth.getToken()
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  function (response) {
    // 判断如果认证失败则跳转到登录页面
    if (response.statusCode === 401) {
      top.location.href = basicConfig.host + '/login'
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 关闭loading
function closeLoading () {
  if (loadingInstance) {
    // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    loadingInstance.close()
    // })
  }
}
// 显示loading
function showLoading () {
  loadingInstance = Loading.service({
    spinner: 'el-icon-loading',
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

// http post 请求
export function post (url, params, hideErrorMsg) {
  showLoading()
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(response => {
        closeLoading()
        response = response.data
        if (response && response.status === SUCCESS_STATUS) {
          resolve(response.data)
        } else {
          console.log(response)
          if (!hideErrorMsg) {
            Message({
              message: `${response.message}`,
              type: 'error',
              duration: 3 * 1000
            })
          }
        }
      })
      .catch(error => {
        closeLoading()
        if (!hideErrorMsg) {
          Message({
            message: error.Message,
            type: 'error',
            duration: 3 * 1000
          })
        }
        console.log(error)
        reject(error)
      })
  })
}
// 表单 post 请求
export function formPost (url, formData, hideErrorMsg) {
  showLoading()
  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        closeLoading()
        response = response.data
        if (response && response.status === SUCCESS_STATUS) {
          resolve(response.data)
        } else {
          console.log(response)
          if (!hideErrorMsg) {
            Message({
              message: `${response.message}`,
              type: 'error',
              duration: 3 * 1000
            })
          }
        }
      })
      .catch(error => {
        closeLoading()
        if (!hideErrorMsg) {
          Message({
            message: error.Message,
            type: 'error',
            duration: 3 * 1000
          })
        }
        console.log(error)
        reject(error)
      })
  })
}
// http get 请求
export function get (url, params, hideErrorMsg) {
  showLoading()
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(response => {
        closeLoading()
        response = response.data
        if (response && response.status === SUCCESS_STATUS) {
          resolve(response.data)
        } else {
          console.log(response)
          if (!hideErrorMsg) {
            Message({
              message: `${response.message}`,
              type: 'error',
              duration: 3 * 1000
            })
          }
        }
      })
      .catch(error => {
        closeLoading()
        if (!hideErrorMsg) {
          Message({
            message: error.Message,
            type: 'error',
            duration: 3 * 1000
          })
        }
        console.log(error)
        reject(error)
      })
  })
}
