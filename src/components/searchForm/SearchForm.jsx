/* eslint-disable react/prop-types */
import React,{useEffect,useState} from 'react'
import { LockOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Row, Col, Space, Select } from 'antd'
import style from "./searchForm.module.scss"

const SearchForm = (props) => {
  const [form] = Form.useForm()
  const [clientReady, setClientReady] = useState(false)
  
  const onFinish = (values) => {
    const params = {}
    Object.keys(values).forEach(key=>{
      console.log(key)
      if(values[key] !== undefined) {
        params[key] = values[key]
      }
    })

    //通知父组件开始搜索
    props.onSearch(values)
  }
  const reset = () =>{
    form.resetFields()
    form.submit()
  }
    
  return (
    <div>
      <div className={style.search}>


        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ offset: 1 }} onFinish={onFinish}>
          <Row>
            <Col span={8}>
              <Form.Item name="name" label="试卷名称">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="creator" label="创建人">
                <Select  
                  allowClear
                  placeholder="请输入"
                  options={[]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="classify" label="试卷科目">
                <Select  
                  allowClear
                  placeholder="请输入"
                  options={[]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Space>
                  <Button type="primary" htmlType="submit">搜索</Button>
                  <Button type="primary" ghost onClick={reset} >重置</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default SearchForm



