import './request.js'
import axios from 'axios'

// 创建试题
export const createQuestionApi = (quesObj) => {
  return axios.post('/question/create', quesObj)
}

// 查询题库列表
export const getQuesListApi = (page, pagesize, question) => {
  return axios.get('/question/list', {
    page,
    pagesize,
    question
  })
}

// 编辑题目
export const updateQuesApi = (obj) => {
  return axios.post('/question/update', obj)
}

// 删除题目
export const delQuesApi = (id) => {
  return axios.post('/question/remove', {id})
}

// 查询试题类型
export const getQuesTypeApi = () => {
  return axios.get('/question/type/list')
}

// 创建试题类型
export const getQuesTypeListApi = (name, value) => {
  return axios.get('/question/type/list', {
    params: {
      name,
      value
    }
  })
}

// 批量创建试题
export const createQuesMultApi = (obj) => {
  axios.post('/question/create/multiple', obj)
}
