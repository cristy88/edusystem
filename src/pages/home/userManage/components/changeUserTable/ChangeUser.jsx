/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Form, Button, Select } from 'antd'

const ChangeUser = (props) => {
  const [FormRef] = Form.useForm()
  const formFinish = (values) => {
    console.log('表单验证成功', values)
  }

  return (
    <Form onFinish={formFinish} form={FormRef}>
      <Form.Item name="role">
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          defaultValue={props.role}
          options={props.allroles?.map(v => {
            return {
              label: v.name,
              value: v.value
            }
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ChangeUser