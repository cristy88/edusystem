/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Table, Form, Input, Button } from 'antd'
import style from './Editable.module.scss'
import { autoBatchEnhancer } from '@reduxjs/toolkit'

const cols = [
  {nickname: 'question', name: '问题'},
  {nickname: 'type', name: '类型'},
  {nickname: 'classify', name: '科目类型'},
  {nickname: 'answer', name: '答案'},
  {nickname: 'opt1', name: '选项一'},
  {nickname: 'opt2', name: '想想二'},
  {nickname: 'opt3', name: '选项三'},
  {nickname: 'opt4', name: '选项四'},
  {nickname: 'desc', name: '描述'},
  {
    nickname: 'do', name: '操作'
  }
]

const Editable = (props) => {
  const { data, trueQuesType, trueClassify } = props
  const [trueData, setData] = useState([])

  const columns = cols.map(v => {
    const obj = {}
    if (v.nickname === 'do') {
      obj.render = (_, record) => {
        return <Button type="primary" size="small">编辑</Button>
      }
      obj.width = '50px'
    } else if (v.nickname === 'question') {
      obj.render = (_, record) => {
        return <span className={style.textT}>{_}</span>
      }
      obj.fixed = 'left'
      obj.width = '200px'
    }
    return {
      title: v.name,
      dataIndex: v.nickname,
      width: '100px',
      ...obj
    }
  })

  useEffect(() => {
    const dd = []
    data.forEach(v => {
      v.forEach(obj => {
        Object.keys(obj).forEach(k => {
          obj[k] = obj[k] + ''
        })
        dd.push(obj)
      })
    })
    setData(dd)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Form.Item>
      <Table
        rowKey={record => record['question']}
        columns={columns}
        dataSource={trueData}
        scroll={{x: '1300px'}}
        pagination={false}
      />
    </Form.Item>
  )
}

export default Editable