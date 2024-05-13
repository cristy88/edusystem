import React, { useEffect, useState } from 'react'
import { getExaninationListApi } from '../../../../api'
import { Space, Table } from 'antd'
import style from './list.module.scss'
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  ConfigProvider
} from 'antd'
import moment from 'moment'
import SearchForm from './components/searchPath/SearchForm'
import TablePath from './components/tablePath/TablePath'

const List = () => {

  const onDelete = (e) => {
    // confirm('删除')
    console.log('删除', e.target.parentNode.parentNode.parentNode)
    e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode)
    return 
  }

  const columns = [
    {
      title: '考试名称',
      dataIndex: 'name',
      key: 'name',
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
        <div>
          <button style={{fontSize: "12px", marginRight: "20px"}}>预览试卷</button>
          {record.status === 1 ? <button disabled style={{fontSize: "12px"}}>删除</button> : <button style={{fontSize: "12px"}} onClick={(e) => onDelete(e)}>删除</button>}
        </div>
        
      ),
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 1 ? <button style={{fontSize: "12px"}}>成绩分析</button> : <button style={{fontSize: "12px"}}>编辑</button>}
        </Space>
      ),
    },
  ]

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
        <div className={style.tableCont}>
          {/* <Table columns={columns} dataSource={list}/> */}
          <TablePath />
        </div>
      </div>
      
    </div>
  )
}

export default List