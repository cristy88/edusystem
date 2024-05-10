import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { selUserListApi, createUserApi, updateUserApi, deleteUserApi, getRoleApi } from '../../../../api'
import style from '../UserManage.module.scss'
import { Table, Button, Space, Image, Switch, Popconfirm, message, Modal, Select, Form } from 'antd'
import ChangeUser from '../components/changeUserTable/ChangeUser'
import SearchForm from '@/components/searchForm/SearchForm'

const { Option } = Select
const isLR = [
  {'name': '头像', 'nickname': 'avator'},
  {'nickname': 'status', 'name': '是否禁用'},
  {'nickname': 'username', 'name': '用户名'},
  {'nickname': 'password', 'name': '密码'},
  {'nickname': 'lastOnlineTime', 'name': '最后登录'},
  {'nickname': 'creator', 'name': '创建人'},
  {'nickname': 'do', 'name': '操作'}
]

const searForm = [
  {
    type: 'input',
    label: '账号/姓名',
    name: 'username',
    placeholder: '请输入账号'
  },
  {
    type: 'select',
    label: '启动状态',
    name: 'status',
    props: {
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ],
      allowClear: true
    }
  }
]

const UserManageUser = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [userList, setUserList] = useState([])  //用户列表
  const [params, setParams] = useState({})  //查询条件
  const [total, setTotal] = useState(-1)   //用户总数
  const [totalPage, setTotalPage] = useState(-1)
  const [page, setPage] = useState(1)  //当前页
  const [pagesize, setPagesize] = useState(10)   //默认每页条数
  const columns = useRef([])  //表格列数据
  const [allroles, setAllRoles] = useState([])  //所所有角色
  const [form] = Form.useForm()  // 编辑角色表单
  const [isModalOpen, setModalOpen] = useState(false)  //控制添加编辑用户的对话框是否打开
  const [userInfo, setUserInfo] = useState({})  //用户信息
  const [isEditLoading, setEditLoaing] = useState(false)
  const trueAllRoles = useRef([])

  // 获取所有可选角色
  const getAllRole = async () => {
    const res = await getRoleApi()
    // console.log('获取角色', res.data.data.list)
    setAllRoles(res.data.data.list)
  }

  // 获得用户列表
  const getUserList = async (page, pagesize) => {
    try {
      const res = await selUserListApi(page, pagesize, {...params})
      // console.log(res.data.data.list)
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
      // console.log('gengxin', res)
      if (res.data.code === 200) {
        message.success('更新成功')
        getUserList(page, pagesize)
        setModalOpen(false)
      } else {
        message.error(res.data.msg)
      }
      setEditLoaing(false)
    } catch(e) {
      console.log('更新用户信息err', e)
    }
  }

  // 创造用户
  const createUser = async (objUser) => {
    try {
      const res = await createUserApi(objUser)
      // console.log('创造用户', res)
      if (res.data.code === 200) {
        message.success('创建用户成功')
        getUserList(page, pagesize)
        setModalOpen(false)
      } else {
        message.error(res.data.msg)
      }
      setEditLoaing(false)
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
    info.status = !info.status
    updateUser({id: info['_id'], status: info.status})
  }

  // 补零函数
  const toZero = (num) => {
    return num.toString()[1] ? num : '0' + num
  }

  // 转换时间
  const timestoTime = (time) => {
    if (!time) return '-'
    let date = new Date(time)
    let year = toZero(date.getFullYear()) || ''
    let month = toZero(date.getMonth() + 1) || ''
    let day = toZero(date.getDate()) || ''
    let hours = toZero(date.getHours()) || ''
    let mintes = toZero(date.getMinutes()) || ''
    let seconds = toZero(date.getSeconds()) || ''
    return year + '-' + month + '-' + day + ' ' + hours + ':' + mintes + ':' + seconds
  }

  // 分页器更改
  const changePage = (page, pageSize) => {
    setPage(page)
    setPagesize(pageSize)
  }

  const confirm = (id) => {
    // console.log('删除用户', id)
    delUser(id)
  }

  // // 用户添加角色提交表单
  const handleRoleFormSubmit = (id) => {
    form.validateFields()
      .then(values => {
        // console.log('提交表单', values)
        updateUser({id, ...values})
      })
      .catch(info => {
        console.log(info)
      })
  }

  useEffect(() => {
    // console.log('所有角色', allroles)
    trueAllRoles.current = allroles
  }, [allroles])

  // 为用户分配角色
  const roleModal = (id, role) => {
    // console.log('点击分配角色', role)
    // console.log('所有角色', trueAllRoles.current)
    // getAllRole()
    Modal.confirm({
      title: '分配角色',
      centered: true,
      maskClosable: true,
      destroyOnClose: true,
      content: (
        <Form form={form} preserve={false}>
          <Form.Item name="role" initialValue={role}>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
            >
              {trueAllRoles.current.map(rol => (
                <Select.Option key={rol['_id']} value={rol.value}>
                  {rol.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log('确定')
        handleRoleFormSubmit(id)
        // form.resetFields()
      },
      onCancel() {
        console.log('取消')
        // form.resetFields()
      }
    })
  }

  useEffect(() => {
    getUserList(page, pagesize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pagesize, params])

  const handleUserEdit = (user) => {
    setUserInfo(user)
    setModalOpen(true)
  }

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
          <Button onClick={() => handleUserEdit(record)} size="small" disabled={record['username'] === 'root'}>编辑</Button>
          <Popconfirm
            title="确定要删除该用户吗?"
            onConfirm={() => confirm(record['_id'])}
            onCancel={ () => console.log('取消删除') }
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

  const getSearchForm = (values) => {
    setPage(1)
    setParams(values)
  }

  return (
    <div className={style.box}>
      {contextHolder}
      <Button onClick={() => {setUserInfo({}) , setModalOpen(true)}}>添加用户</Button>
      <ChangeUser loadEdit={isEditLoading} showLoad={() => setEditLoaing(true)} userInfo={userInfo} showModalOpen={isModalOpen} updateUser={updateUser} createUser={createUser} closeModal={() => setModalOpen(false)} />
      <SearchForm tabledata={searForm} getSear={getSearchForm} />
      <Table
        rowKey={record => record['_id']}
        columns={columns.current}
        dataSource={userList}
        scroll={{x: '130%'}}
        pagination={{
          pageSize: pagesize,
          pageSizeOptions: [5, 10, 20, 50],
          total: total,
          showTotal: () => `总共${totalPage}条`,
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