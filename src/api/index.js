import axios from 'axios'

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
  axios.post('/user/create', {
    username,
    password,
    status
  })
}

// 查询用户列表
export const selUserListApi = () => {
  return axios.get('/user/list')
}

// 编辑用户
export const updateUserApi = ({id, username}) => {
  axios.post('/user/update',{
    id,
    username
  })
}

// 删除用户
export const deleteUserApi = ({id}) => {
  return axios.post('/user/remove', {
    id
  })
}

// 查询个人信息
export const getPersonInfoApi = () => {
  return axios.get('/user/info')
}

// 上传头像
export const toAvatarApi = ({avatar}) => {
  return axios.post('/profile', {
    avatar
  })
}

// 创建班级
export const createClass = ({name, classify, teacher, students}) => {
  return axios.post('/studentGroup/create', {
    name,
    classify,
    teacher,
    students
  })
}

// 查询班级
export const queryClass = () => {
  return axios.post('/studentGroup/list')
}

// 编辑班级
export const redactClass = ({id, name}) => {
  return axios.post('/studentGroup/update', {
    id,
    name
  })
}

// 删除班级
export const deleteClass = ({id}) => {
  return axios.post('/studentGroup/remove', {
    id
  })
}

// 创建学生
export const createStudent = ({
  username, password, sex, age, className, status}) => {
  return axios.post('/student/create', {
    username, 
    password, 
    sex, 
    age, 
    className, 
    status
  })
}

// 查询学生
export const queryStudent = () => {
  return axios.post('/student/list')
}

// 编辑学生
export const redactStudent = ({id, name}) => {
  return axios.post('/student/update', {
    id,
    name
  })
}

// 删除班级
export const deleteStudent = ({id}) => {
  return axios.post('/student/remove', {
    id
  })
}