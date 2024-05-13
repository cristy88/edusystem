/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd'
import { studentClass } from '../../../../../../api/index'

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const onFinish = (values) => {
  console.log(values)
}

const AddStudents = () => {
  const [groupList, setGroupList] = useState({})    // 班级列表
  const [group, setGroup] = useState([])
  const [data, setData] = useState([])   // 渲染数据 
  const [sexOptions, setSexOptions] = useState([])   // 性别
  const [classNameOptions, setClassNameOptions] = useState([])  // 班级
  // 学生列表接口
  const getStudentList = async () => {
    const res = await studentClass({...group, ...groupList})
    if (res.data.code === 200) {
      setData(res.data.data.list)
      const sexs = new Set(res.data.data.list.map(item => item.sex))
      const classNames = new Set(res.data.data.list.map(item => item.className))
      setSexOptions(Array.from(sexs).map(sex => (
        <Select.Option key={sex} value={sex}>
          {sex}
        </Select.Option>
      )))
      setClassNameOptions(Array.from(classNames).map(className => (
        <Select.Option key={className} value={className}>
          {className}
        </Select.Option>
      )))
    }
    // console.log('学生信息', res.data.data.list)
  }
  useEffect(() => { 
    getStudentList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, groupList])

  return (
    <div>
      <Form
        name="basic"
        labelCol={{span: 8,}}
        wrapperCol={{span: 16,}}
        style={{maxWidth: 380,}}
        initialValues={{remember: true,}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入姓名!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="老师"
          name="teacher"
          rules={[
            {
              required: true,
              message: '请输入老师!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="性别"
          name="classify"
          rules={[
            {
              required: true,
              message: '请输入性别!',
            },
          ]}
        >
          <Select>{sexOptions}</Select>
        </Form.Item>
        <Form.Item
          label="年龄"
          name="classify"
          rules={[
            {
              required: true,
              message: '请输入年龄!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="身份证号"
          name="classify"
          rules={[
            {
              required: true,
              message: '请输入身份证号!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="classify"
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="班级名称"
          name="classify"
          rules={[
            {
              required: true,
              message: '请输入班级名称!',
            },
          ]}
        >
          <Select>{classNameOptions}</Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div style={{marginLeft: '30px'}}>
            <Button type="primary" htmlType="submit" style={{margin: '10px'}}>确定</Button>
            <Button type='default' htmlType="reset">取消</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
    
  )
}

export default AddStudents