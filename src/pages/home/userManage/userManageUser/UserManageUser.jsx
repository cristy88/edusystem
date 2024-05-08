import React, { useEffect, useState } from 'react'
import { selUserListApi, createUserApi, updateUserApi, deleteUserApi } from '../../../../api'
import style from '../UserManage.module.scss'
import { Table } from 'antd'

const isLR = [
  {'name': '头像', 'nickname': 'avatar'},
  {'nickname': 'status', 'name': '是否禁用'},
  {'nickname': 'username', 'name': '用户名'},
  {'nickname': 'password', 'name': '密码'},
  {'nickname': 'lastOnlineTime', 'name': '最后登录'},
  {'nickname': 'creator', 'name': '创建人'},
  {'nickname': 'do', 'name': '操作'}
]

const columns = isLR.map((v, ind) => {
  const obj = {}
  if (ind === 0) {
    obj.fixed = 'left'
  } else if (ind === isLR.length - 1) {
    obj.fixed = 'right'
    obj.render = () => <a>action</a>
  } else if (v.nickname === 'avatar') {
    obj.render = () => <p>头像</p>
  } else if (v.nickname === 'status') {
    obj.render = (_, record) => {
      console.log('是否禁用',_, record)
      return <a>是否禁用</a>
    }
  }
  return {
    width: 100,
    title: v.name,
    dataIndex: v.nickname,
    key: v.nickname,
    ...obj
  }
})

console.log('columns', columns)

const UserManageUser = () => {
  const [userList, setUserList] = useState([])
  const [total, setTotal] = useState(-1)
  const [totalPage, setTotalPage] = useState(-1)
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)

  const getUserList = async (page, pagesize) => {
    try {
      const res = await selUserListApi(page, pagesize)
      console.log(res.data.data.list)
      setUserList(res.data.data.list)
      setTotal(res.data.data.total)
      setTotalPage(res.data.data.totalPage)
    } catch(e) {
      console.log('搜索用户列表err', e)
    }
  }

  const updateUser = async () => {
    try {
      const res = await updateUserApi()
      console.log('gengxin', res)
    } catch(e) {
      console.log('更新用户信息err', e)
    }
  }

  const createUser = async () => {
    try {
      const res = await createUserApi()
      console.log('创造用户', res)
    } catch(e) {
      console.log('创造用户err',e)
    }
  }

  const delUser = async (id) => {
    try {
      const res = await deleteUserApi(id)
      console.log('删除用户', res)
    } catch(e) {
      console.log('删除用户err', e)
    }
  }

  useEffect(() => {
    getUserList(page, pagesize)
  }, [page, pagesize])

  return (
    <div className={style.box}>
      <Table rowKey={record => record['_id']} columns={columns} dataSource={userList} scroll={{x: 300}} />
    </div>
  )
}

export default UserManageUser