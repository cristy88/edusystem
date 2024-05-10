/* eslint-disable react/prop-types */
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