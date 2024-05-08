import axios from 'axios'
import { message } from 'antd'

axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = localStorage.getItem('token') || ''
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log('响应错误', error)
  if (error.response.status === 401) {
    message.error('登录信息失效，请重新登录')
    window.location.assign('/login')
    return Promise.reject(new Error('登录信息失效'))
  }
  message.error('错误码' + error.response.status)
  return Promise.reject(error)
})

// 登录
export const toLoginApi = ({username, password, code}) => {
  return axios.post('/login', {
    username,
    password,
    code
  })
}

// 获得图形验证码
export const getCodeApi = () => {
  return axios.get('/login/captcha')
}

// 退出登录
export const exitLoginApi = ({username, password, code}) => {
  return axios.post('/user/logout', {
    username,
    password,
    code
  })
}

// 创建用户
export const createUserApi = ({username, password, status}) => {
  return axios.post('/user/create', {
    username,
    password,
    status
  })
}

// 查询用户列表
export const selUserListApi = (page = 1, pagesize = 100) => {
  return axios.get('/user/list', {
    params: {
      page,
      pagesize
    }
  })
}

// 编辑用户
export const updateUserApi = (UserObj) => {
  return axios.post('/user/update',UserObj)
}

// 删除用户
export const deleteUserApi = (id) => {
  return axios.post('/user/remove', {
    id
  })
}

// 查询个人信息
export const getPersonInfoApi = () => {
  return axios.get('/user/info')
}

// 上传头像
export const toAvatarApi = (avatar) => {
  return axios.post('/profile', {
    avatar
  })
}

// 修改用户信息
export const updateInfoApi = ({username, password, sex, age, email, avatar}) => {
  return axios.post('user/update/info', {
    username,
    password,
    sex,
    age,
    email,
    avatar
  })
}

// 查询左侧菜单
export const getLeftMeauApi = () => {
  return axios.get('/user/menulist')
}

// 查询角色
export const getRoleApi = () => {
  return axios.get('/role/list')
}
