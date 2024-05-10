/* eslint-disable react/prop-types */
<<<<<<< HEAD
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



=======
import React, {useState} from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd'

const SearchForm = (props) => {
  const { tabledata, getSear } = props
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [expand, setExpand] = useState(false)
  const formStyle = {
    maxWidth: 'none',
    background: 'white',
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  const getItem = (item) => {
    if (item.type === 'select') {
      return (
        <Select {...item.props} />
      )
    } else {
      return (
        <Input placeholder={item.placeholder} allowClear {...item.props} />
      )
    }
  }

  const getFields = () => {
    const count = expand ? tabledata.length : 2
    const children = []
    for(let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {
            <Form.Item label={tabledata[i].label} name={tabledata[i].name}>
              { getItem(tabledata[i]) }
            </Form.Item>
          }
        </Col>
      )
    }
    return children
  }

  // 点击搜索按钮
  const handleFinish = (values) => {
    const obj = {}
    Object.keys(values).forEach(v => {
      if (values[v] != undefined && values[v] !== '') {
        obj[v] = values[v]
      }
    })
    // console.log('搜索表单展示结果', obj)
    getSear(obj)
  }

  const handleReset = () => {
    getSear({})
  }

  return (
    <Form form={form} style={formStyle} onFinish={handleFinish}>
      <Row gutter={24}> {getFields()} </Row>
      <div style={{textAlign: 'right'}}>
        <Space size="small">
          <Button type="primary" htmlType='submit'>
            搜索
          </Button>
          <Button htmlType="reset" onClick={handleReset}>重置</Button>
          {tabledata.length > 2 ? <a style={{fontSize: 12}} onClick={() => setExpand(!expand)}>
            <DownOutlined ratate={expand ? 180 : 0} />{expand ? '合上' : '展开'}
          </a> : ''}
        </Space>
      </div>
    </Form>
  )
}

export default SearchForm
>>>>>>> lyr
