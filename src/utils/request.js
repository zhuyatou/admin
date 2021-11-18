import axios from 'axios'
import { ElMessage } from 'element-plus'

// 导入store
import store from '@/store/index.js'

// 封装token
const server = axios.create({
  // 后台代理+cros
  timeout: 5000,
  baseURL: '/api'
})

// 请求拦截 封装token
server.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 请求的不是login
      config.headers.Authorization = ` Bearer ${store.getters.token}`
    }
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 错误处理 服务器返错误 消息提醒
server.interceptors.response.use(
  (response) => {
    // 对xiang响应数据做点什么 对的数据 错的数据
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      console.log('xxxxxxxxxx')
      ElMessage({
        type: 'error',
        message
      })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 服务器没有返回数据或者是服务器未知错误
    ElMessage({
      type: 'error',
      message: 'xxx'
    })
    return Promise.reject(error)
  }
)

// 导出一个对象
export default server
