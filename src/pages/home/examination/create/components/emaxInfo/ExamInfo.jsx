import React, { useState, useEffect } from 'react'
import { queryClass, getClassifyListApi, selUserListApi } from '../../../../../../api'
import { Form, Input, DatePicker, Select, Button } from 'antd'

// eslint-disable-next-line react/prop-types
const ExamInfo = ({formVal}) => {
  
  const [grade, setGrade] = useState([])
  const [examiner, setExaminer] = useState([])
  const [classify, setClassify] = useState([])

  const { RangePicker } = DatePicker

  const getClass = async () => {
    const res = await queryClass()
    setGrade(res.data.data.list)
  }
  
  const getExaminer = async () => {
    const res = await selUserListApi()
    console.log(res)
    setExaminer(res.data.data.list)
  }

  const getClassifyList = async () => {
    const res = await getClassifyListApi()
    setClassify(res.data.data.list)
  }

  useEffect(() => {
    getClass()
  }, [])
  useEffect(() => {
    getExaminer()
  }, [])
  useEffect(() => {
    getClassifyList()
  }, [])


  return (
    <div>
      <Form.Item
        label="考试名称"
        name="name"
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
        ]}
        style={{
          width: 300,
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="考试时间"
        name="ExamTime"
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
        ]}
        style={{
          width: 400,
        }}
      >
        <RangePicker placeholder="请选择" showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item
        label="科目分类"
        name="classify"
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
        ]}
        style={{
          width: 500,
        }}
      >
        <Select placeholder="请选择">
          {classify.map(item => 
            <Select.Option value={item.name} key={item._id}>{item.name}</Select.Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        label="监考人"
        name="examiner"
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
        ]}
        style={{
          width: 500,
        }}
      >
        <Select placeholder="请选择">
          {examiner.map(item => 
            <Select.Option value={item.username} key={item._id}>{item.username}</Select.Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        label="考试班级"
        name="group"
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
        ]}
        style={{
          width: 500,
        }}
      >
        <Select placeholder="请选择">
          {grade.map(item => 
            <Select.Option value={item.name} key={item._id}>{item.name}</Select.Option>
          )}
        </Select>
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType='submit' onClick={() => formVal()}>
          下一步
        </Button>
      </Form.Item>
    </div>
  )
}

export default ExamInfo