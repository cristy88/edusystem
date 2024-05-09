/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}

const ChangeUser = (props) => {
  const { loadEdit, showLoad, userInfo, updateUser, createUser, showModalOpen, closeModal } = props
  const [form] = Form.useForm()

  // 用户添加角色提交表单
  const handleRoleFormSubmit = () => {
    form.validateFields()
      .then(values => {
        showLoad()
        if (Object.keys(userInfo).length === 0) {
          createUser(values)
        } else {
          console.log('更新用户')
          updateUser({id: userInfo['_id'], ...values})
        }
      })
      .catch(info => {
        console.log(info)
      })
  }

  const handleOk = () => {
    handleRoleFormSubmit()
    console.log('关闭')
  }

  const handleCancel = () => {
    closeModal()
    console.log('取消')
  } 

  useEffect(() => {
    if (showModalOpen) {
      // console.log('清空原表单')
      form.resetFields()
      if (Object.keys(userInfo).length > 0) {
        const Info = {...userInfo, confirmPassword: userInfo.password}
        form.setFieldsValue(Info)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModalOpen])
  
  return (
    <Modal
      title={Object.keys(userInfo).length > 0 ? "编辑用户" : "新增用户"}
      open={showModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      centered={true}
      width={300}
      confirmLoading={loadEdit}
    >
      <Form form={form} preserve={false} {...formItemLayout}>
        <Form.Item name="username" label="用户名"
          rules={[
            {required: true, message: '用户名不可省略'}
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}  />
        </Form.Item>
        <Form.Item name="password" label="密 码"
          rules={[
            {required: true, message: '请输入密码'}
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item name="confirmPassword" label="确认密码"
          dependencies={['password']}
          rules={[
            {
              required: true, message: '请确认密码'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('与新密码不匹配'))
              },
            })
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
          rules={[
            {required: true, message: "请选择状态"}
          ]}
        >
          <Radio.Group>
            <Radio value={1}>选用</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangeUser