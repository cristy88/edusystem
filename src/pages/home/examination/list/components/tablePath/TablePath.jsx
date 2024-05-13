/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Popconfirm, Table, Space, Modal, message, Drawer } from 'antd'
import { getExaninationListApi, examinationRemoveApi } from '../../../../../../api'
import moment from 'moment'
import style from './tablePath.module.scss'

const option = ["A", "B", "C", "D"] 

const TablePath = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false) // 控制Modal显示状态
  const [currentKey, setCurrentKey] = useState('') // 当前要删除的行的key
  const [open, setOpen] = useState(false) //试卷预览显示状态
  const [paper, setPaper] = useState([])
  const [questions,setQuestions] = useState([])
  const [single, setSingle] = useState([])  // 1
  const [moreChoice, setMoreChoice] = useState([])  // 2
  const [judge, setJudge] = useState([])  // 3
  const [fillGap, setFillGap] = useState([])  // 4

  const getExamination = async () => {
    const res = await getExaninationListApi()
    if(res.status === 200) {
      setList(res.data.data.list)
    }
  }

  const removeExamination = async () => {
    const res = await examinationRemoveApi(currentKey)
    if(res.status === 200) {
      message.success('删除成功')
      getExamination()
    }
  }

  useEffect(() => {
    getExamination()
  }, [])

  // 删除行的函数
  const handleDelete = (key) => {
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

  // 预览试卷
  const previewPaper = (id) => {
    setOpen(true)
    const res = list.find(item => item._id === id)
    console.log(res)
    setPaper(res)
    setQuestions(res.questionsList)
    const s = res.questionsList.filter(item => item.type === '1')
    setSingle(s)
    const m = res.questionsList.filter(item => item.type === '2')
    setMoreChoice(m)
    const j = res.questionsList.filter(item => item.type === '3')
    setJudge(j)
    const f = res.questionsList.filter(item => item.type === '4')
    setFillGap(f)
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
          <button className={style.actionBtn} onClick={() => previewPaper(record._id)}>预览试卷</button>
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
  // console.log('试卷',paper)
  // console.log('单选',single)
  // console.log('多选',moreChoice)
  // console.log('判断',judge)
  // console.log('填空',fillGap)

  return (
    <div>
      <Table
        bordered
        rowKey={record => record._id}
        dataSource={list}
        columns={defaultColumns}
        rowClassName={() => 'editable-row'}
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
      <Drawer title="试卷预览" size='large' onClose={() => setOpen(false)} open={open}>
        <div className={style.paper}>
          <h1>{paper.name}</h1>
          <p className={style.classify}>科目：{paper.classify}</p>
          {single.length > 0 && 
            <div>
              <p className={style.sort}>单选题</p>
              {single.map((item, index) => 
                <div key={item._id}>
                  <p className={style.question}>{index + 1}、{item.question}</p>
                  {item.options.map((opt, index) => 
                    <span className={style.options} key={Math.random()}>{option[index]}.{opt}</span>
                  )}
                </div>
              )}
            </div>
          }
          {moreChoice.length > 0 && 
            <div>
              <p className={style.sort}>多选题</p>
              {moreChoice.map((item, index) => 
                <div key={item._id}>
                  <p className={style.question}>{index + 1}、{item.question}</p>
                  {item.options.map((opt, index) => 
                    <span className={style.options} key={Math.random()}>{option[index]}.{opt}</span>
                  )}
                </div>
              )}
            </div>
          }
          {judge.length > 0 && 
            <div>
              <p className={style.sort}>判断题</p>
              {judge.map((item, index) => 
                <div key={item._id}>
                  <p className={style.question}>{index + 1}、{item.question}</p>
                  {item.options.map((opt, index) => 
                    <span className={style.options} key={Math.random()}>{option[index]}.{opt}</span>
                  )}
                </div>
              )}
            </div>
          }
          {fillGap.length > 0 && 
            <div>
              <p className={style.sort}>填空题</p>
              {fillGap.map((item, index) => 
                <p className={style.question} key={item._id}>{index + 1}、{item.question}</p>
              )}
            </div>
          }
        </div>
      </Drawer>
    </div>
    
  )
}
export default TablePath