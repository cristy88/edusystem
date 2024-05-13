/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd'
import { ListClass } from '../../../../../../api/index'

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const onFinish = (values) => {
  console.log(values)
}

const AddClass = () => {
  const [data, setData] = useState([])
  const [groupList, setGroupList] = useState([])    // 班级列表
  const [teacherOptions, setTeacherOptions] = useState([])
  const [classifyOptions, setClassifyOptions] = useState([])

  // 班级列表接口
  const getClassList = async () => {
    try {
      const res = await ListClass({...groupList})
      if (res.data.code === 200) {
        setData(res.data.data.list)
        const teachers = new Set(res.data.data.list.map(item => item.teacher))
        const classifys = new Set(res.data.data.list.map(item => item.classify))
        setTeacherOptions(Array.from(teachers).map(teacher => (
          <Select.Option key={teacher} value={teacher}>
            {teacher}
          </Select.Option>
        )))
        setClassifyOptions(Array.from(classifys).map(classify => (
          <Select.Option key={classify} value={classify}>
            {classify}
          </Select.Option>
        )))
      }
    // console.log('老师', res.data.data.list)
    } catch (error) {
      console.error('Failed to fetch class data:', error)
    }
    
    
  }
  useEffect(() => { 
    getClassList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupList])
  
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
          label="班级名称"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入班级名称!',
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
          <Select>{teacherOptions}</Select>
        </Form.Item>
        <Form.Item
          label="科目类别"
          name="classify"
          rules={[
            {
              required: true,
              message: '请输入科目类别!',
            },
          ]}
        >
          <Select>{classifyOptions}</Select>
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

export default AddClass