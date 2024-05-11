import React, { useEffect, useState } from 'react'
import { getExaninationListApi } from '../../../../api'
import { Space, Table } from 'antd'
import style from './list.module.scss'
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker
} from 'antd'
import moment from 'moment'
import SearchForm from './components/searchPath/SearchForm'

const List = () => {
  const [list, setList] = useState([])
  const { RangePicker } = DatePicker

  const getExamination = async () => {
    const res = await getExaninationListApi()
    if(res.status === 200) {
      const newList = res.data.data.list.map(item => ({
        ...item,
        'key': item._id
      }))
      setList(newList)
    }
  }

  const columns = [
    {
      title: '考试名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      key: 'classify',
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm:ss') : '--'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (s) =>(s === 1 ? '已结束' : '未结束') 
    },
    {
      title: '监考人',
      dataIndex: 'examiner',
      key: 'examiner',
      
    },
    {
      title: '考试班级',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm:ss') : '--'),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm:ss') : '--'),
    },
    {
      title: '设置',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
    },
  ]
  
  useEffect(() => {
    getExamination()
  }, [])

  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 20,
      },
      sm: {
        span: 20,
      },
    },
  }

  return (
    <div className={style.list}>
      {/* <Form
        {...formItemLayout}
        style={{
          margin: 20,
          padding: 30 ,
          background: '#ffffff',
        }}
        layout="vertical"
      >
        <div className={style.search}>
          <div className={style.antCol}>
            <Form.Item
              label="考试名称"
              name="name"
            >
              <Input />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="科目分类"
              name="classify"
            >
              <Select placeholder="请选择">
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="usa">U.S.A</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="创建者"
              name="creator"
            >
              <Input />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="创建时间"
              name="createTime"
            >
              <RangePicker placeholder="请选择" showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="状态"
              name="status"
            >
              <Select placeholder="请选择">
                <Select.Option value="0">未开始</Select.Option>
                <Select.Option value="1">已结束</Select.Option>
                <Select.Option value="2">进行中</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="监考人"
              name="examiner"
            >
              <Input />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="考试班级"
              name="group"
            >
              <Select placeholder="请选择">
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="usa">U.S.A</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="考试时间"
              name="examTime"
            >
              <RangePicker placeholder="请选择" showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </div>
          
          <div className={style.antCol}>
            <Form.Item>
              <Button type="default" style={{marginRight: 10}}>
                重置
              </Button>
              <Button type="primary">
                查询
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form> */}
      <SearchForm />
      <div className={style.table}>
        <p>考试记录</p>
        <div>
          <Table columns={columns} dataSource={list} style={{}}/>
        </div>
      </div>
    </div>
  )
}

export default List