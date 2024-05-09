import axios from 'axios'
import './request.js'

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
export const updateInfoApi = (userObj) => {
  return axios.post('user/update/info', userObj)
}

// 查询左侧菜单
export const getLeftMeauApi = () => {
  return axios.get('/user/menulist')
}

// 查询角色
export const getRoleApi = () => {
  return axios.get('/role/list')
}
