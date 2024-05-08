import React, { useEffect, useRef, useState } from 'react'
import { selUserListApi, createUserApi, updateUserApi, deleteUserApi, getRoleApi } from '../../../../api'
import style from '../UserManage.module.scss'
import { Table, Button, Space, Image, Switch, Popconfirm, message, Modal, Select, Form } from 'antd'

const isLR = [
  {'name': '头像', 'nickname': 'avator'},
  {'nickname': 'status', 'name': '是否禁用'},
  {'nickname': 'username', 'name': '用户名'},
  {'nickname': 'password', 'name': '密码'},
  {'nickname': 'lastOnlineTime', 'name': '最后登录'},
  {'nickname': 'creator', 'name': '创建人'},
  {'nickname': 'do', 'name': '操作'}
]

const UserManageUser = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [userList, setUserList] = useState([])
  const [total, setTotal] = useState(-1)
  const [totalPage, setTotalPage] = useState(-1)
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)
  const columns = useRef([])
  const [allroles, setAllRoles] = useState([])
  const [vals, setVals] = useState([]) //每个人的角色
  const [form] = Form.useForm()

  const getAllRole = async () => {
    const res = await getRoleApi()
    console.log('获取角色', res.data.data.list)
    const trueRes = res.data.data.list
    const opts = trueRes.map(v => {
      return {
        label: v.name,
        value: v.value
      }
    })
    setAllRoles(opts)
  }

  // 获得用户列表
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

  // 更新用户信息
  const updateUser = async (obj) => {
    try {
      const res = await updateUserApi(obj)
      console.log('gengxin', res)
      if (res.data.code === 200) {
        message.success('更新成功')
        getUserList(page, pagesize)
      }
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
      if (res.data.code === 200) {        
        getUserList(page, pagesize)
        messageApi.open({
          type: 'success',
          content: '删除成功',
        })
      }
    } catch(e) {
      console.log('删除用户err', e)
    }
  }

  // 点击开关
  const changeSwitch = (info) => {
    console.log('开关改变', info)
  }

  // 补零函数
  const toZero = (num) => {
    return num.toString()[1] ? num : '0' + num
  }

  // 转换时间
  const timestoTime = (time) => {
    let date = new Date(time)
    let year = toZero(date.getFullYear()) || 0
    let month = toZero(date.getMonth() + 1) || 0
    let day = toZero(date.getDate()) || 0
    let hours = toZero(date.getHours()) || 0
    let mintes = toZero(date.getMinutes()) || 0
    let seconds = toZero(date.getSeconds()) || 0
    return year + '-' + month + '-' + day + ' ' + hours + ':' + mintes + ':' + seconds
  }

  // 分页器更改
  const changePage = (page, pageSize) => {
    setPage(page)
    setPagesize(pageSize)
  }

  const confirm = (id) => {
    console.log('删除用户', id)
    delUser(id)
  }

  const cancel = () => {
    console.log('取消删除')
  }

  const handleChange = (value) => {
    console.log('选择', value)
    setVals(() => [...vals,...value])
  }

  const roleModal = (id, role) => {
    console.log('点击分配角色', role)
    console.log('点击之后所有角色', allroles)
    // setVals(() => [])
    Modal.confirm({
      title: '分配角色',
      content: (
        <Form form={form}>
          <Form.Item>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              defaultValue={role}
              onChange={handleChange}
              options={allroles}
            />
          </Form.Item>
        </Form>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log('确定', form)
        // updateUser({id, role: vals})
      }
    })
  }

  useEffect(() => {
    getUserList(page, pagesize)
  }, [page, pagesize])

  // 列表的列
  useEffect(() => {
    getAllRole()
    columns.current = isLR.map((v, ind) => {
      const obj = {}
      if (ind === 0) {
        obj.fixed = 'left'
        obj.width = 80
      } else if (ind === isLR.length - 1) {
        obj.fixed = 'right'
        obj.width = 200
        obj.render = (_, record) => <Space>
          <Button onClick={() => roleModal(record['_id'], record['role'])} type="primary" size="small" disabled={record['username'] === 'root'}>分配角色</Button>
          <Button size="small" disabled={record['username'] === 'root'}>编辑</Button>
          <Popconfirm
            title="确定要删除该用户吗?"
            onConfirm={() => confirm(record['_id'])}
            onCancel={ cancel }
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger disabled={record['username'] === 'root'}>删除</Button>
          </Popconfirm>
        </Space>
      } else if (v.nickname === 'status') {
        obj.render = (_, record) => {
          return <Switch disabled={record['username'] === 'root'} checked={record.status} onChange={() => changeSwitch(record)} />
        }
      } else if(v.nickname === 'lastOnlineTime') {
        obj.render = (_, record) => {
          const trueTime = timestoTime(record['lastOnlineTime'])
          return <span>{ trueTime }</span>
        }
      }
      if (v.nickname === 'avator') {
        obj.render = (_, record) => {
          if (record.avator) {
            return <Image width={50} height={50} src={record.avator} />
          } else {
            return <span>{record['username']}</span>
          }
        }
      }
      return {
        title: v.name,
        dataIndex: v.nickname,
        key: v.nickname,
        ...obj
      }
    })
    console.log(columns.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className={style.box}>
      {contextHolder}
      <Table
        rowKey={record => record['_id']}
        columns={columns.current}
        dataSource={userList}
        scroll={{x: '130%'}}
        pagination={{
          pageSize: pagesize,
          total: total,
          size: 'small',
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: changePage
        }}
      />
    </div>
  )
}

export default UserManageUser