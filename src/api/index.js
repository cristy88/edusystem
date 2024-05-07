import axios from 'axios'

axios.defaults.baseURL = 'https://zyxcl.xyz/exam_api'

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
export const exitLoginApi = () => {
  return axios.post('/user/logout')
}
