import axios from 'axios'

axios.defaults.baseURL = 'https://zyxcl.xyz/exam_api'
axios.defaults.withCredentials = true

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
