import { useEffect, useState } from 'react'
import style from './login.module.scss'
import { Button, Form, Input, Col, Row, message } from "antd"
import { getCodeApi, toLoginApi } from '../../api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [imgUrl, setImgUrl] = useState('')
  const [messageApi, contextHolder] = message.useMessage()
  
  const navigate = useNavigate()

  const getCode = async () => {
    const res = await getCodeApi()
    console.log(res)
    if (res.data.code === 200) {
      setImgUrl(res.data.data.code)
    }
  }

  const onFinish = async (values) => {
    console.log('Success', values)
    try {
      const res = await toLoginApi(values)
      console.log(res)
      if (res.data.code !== 200) {
        messageApi.open({
          type: 'error',
          content: res.data.msg,
        })
        getCode()
      } else {
        console.log('登陆成功')
        navigate('/')
      }
    } catch (e) {
      console.log('登陆出错', e)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed', errorInfo)
  }

  // 获取验证码
  useEffect(() => {
    getCode()
  }, [])

  return (
    <div className={style.login}>
      {contextHolder}
      <h3>老师账号登录</h3>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="验证码">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="code"
                noStyle
                rules={[
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <img src={imgUrl} alt="" onClick={getCode} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login