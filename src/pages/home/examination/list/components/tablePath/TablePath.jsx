/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Popconfirm, Table, Space, Modal, message } from 'antd'
import { getExaninationListApi, examinationRemoveApi } from '../../../../../../api'
import moment from 'moment'
import style from './tablePath.module.scss'

const TablePath = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false) // 控制Modal显示状态
  const [currentKey, setCurrentKey] = useState('') // 当前要删除的行的key

  const getExamination = async () => {
    const res = await getExaninationListApi()
    if(res.status === 200) {
      setList(res.data.data.list)
    }
    console.log(res.data.data.list)
  }

  const removeExamination = async () => {
    console.log('删除',currentKey)
    const res = await examinationRemoveApi(currentKey)
    if(res.status === 200) {
      // setList(res.data.data)
      message.success('删除成功')
      getExamination()
    }
  }

  useEffect(() => {
    getExamination()
  }, [])

  // 删除行的函数
  const handleDelete = (key) => {
    console.log('删除', key)
    setCurrentKey(key)
    setVisible(true) // 显示Modal
  }
  // 确认删除
  const handleDeleteConfirm = () => {
    setLoading(true)
    removeExamination()
    setVisible(false) // 关闭Modal
    setLoading(false)
  }

  const defaultColumns = [
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
      render: (s) =>{
        console.log(s)
        if(s === 1) return <span>已结束</span>
        if(s === 2) return <span>未开始</span> 
        if(s === 3) return <span>进行中</span> 
      }
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
          <button className={style.actionBtn}>预览试卷</button>
          {record.status === 1 ?
            <button disabled className={style.disabledBtn}>删除</button>
            : <button className={style.actionBtn} onClick={() => {handleDelete(record._id)}}>删除</button>
          }
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 1 ? <button className={style.actionBtn}>成绩分析</button> : <button className={style.actionBtn}>编辑</button>}
        </Space>
      ),
    }
  ]

  return (
    <div>
      <Table
        rowKey={record => record._id}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={list}
        columns={defaultColumns}
      />
      <Modal
        title="警告"
        open={visible}
        onOk={handleDeleteConfirm}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
      >
        <p>确定要删除该记录吗？</p>
      </Modal>
    </div>
    
  )
}
export default TablePath