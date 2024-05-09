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

const List = () => {
  const [list, setList] = useState([])
  const { RangePicker } = DatePicker

  const getExamination = async () => {
    const res = await getExaninationListApi()
    if(res.status === 200) {
      setList(res.data.data.list)
    }
    console.log(list)
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
    },
    {
      title: '状态',
      dataIndex: 'address',
      key: 'address',
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
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
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
    // labelCol: {
    //   xs: {
    //     span: 24,
    //   },
    //   sm: {
    //     span: 6,
    //   },
    // },
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
      <Form
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
              name="Input"
            >
              <Input />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="科目分类"
              name="Subject"
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
                <Select.Option value="china">未开始</Select.Option>
                <Select.Option value="usa">已结束</Select.Option>
                <Select.Option value="usa">进行中</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="监考人"
              name="Invigilator"
            >
              <Input />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="考试班级"
              name="ExamClass"
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
      </Form>
      <Table columns={columns} dataSource={list} style={{margin: 30}}/>
    </div>
  )
}

export default List