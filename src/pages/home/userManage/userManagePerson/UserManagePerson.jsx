import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from '@/store/modules/user'
import style from './userMagaPerson.module.scss'
import { updateInfoApi, toAvatarApi } from '@/api'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex, message, Upload, Button, Modal, Form, Input, Select, InputNumber } from 'antd'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能传入JPG/PNG 文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片不能大于 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const UserManagePerson = () => {
  const userInfo = useSelector(s => s.user.userInfo)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [form] = Form.useForm()
  const [isModalOpen, setModalOpen] = useState(false)  //打开对话框
  const [confirmLoading, setConfirmLoading] = useState(false)


  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )

  // 上传头像
  const updateAyatar = async (avatar) => {
    try {
      const res = await toAvatarApi(avatar)
      console.log('上传头像', res)
    } catch(e) {
      console.log('上传头像', e)
    }
  }

  // 修改用户
  const updateInfo = async (obj) => {
    try {
      const res = await updateInfoApi(obj)
      console.log('修改用户信息', res)
      if (res.data.code === 200) {
        dispatch(getUserInfo())  //获取信息
        setModalOpen(false)
        message.success('用户更新成功')
      } else {
        message.error(res.data.msg)
      }
      setConfirmLoading(false)
    } catch (e) {
      console.log('修改用户', e)
    }
  }

  // 表单提交
  const handleOk = () => {
    setConfirmLoading(true)
    handleRoleFormSubmit()
  }

  // 用户添加角色提交表单
  const handleRoleFormSubmit = () => {
    form.validateFields()
      .then(values => {
        console.log('提交表单', values)
        const objInfo = Object.keys(values).filter(v => values[v])
        let Info = {}
        objInfo.forEach(v => { Info = {...Info, [v]: values[v]}})
        // console.log('表单处理后', Info)
        updateInfo(Info)
      })
      .catch(info => {
        console.log(info)
      })
  }

  return (
    <div className={style.userInfo}>
      <div className={style.avatar}>
        <Flex gap="middle" wrap>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action=" https://zyxcl.xyz/exam_api/profile"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Flex>
      </div>
      <div className={style.userCon}>
        <div>用户名称： {userInfo.username} </div>
        <div>性别: {userInfo.sex}</div>
        <div>年龄: {userInfo.age}  </div>
        <div>邮箱地址: {userInfo.email} </div>
      </div>
      <div className={style.edit}>
        <Button type='primary' onClick={() => {
          form.resetFields()
          form.setFieldsValue(userInfo)
          setModalOpen(true)
        }}>编辑</Button>
      </div>
      <Modal
        title="编辑用户"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setModalOpen(false)
        }}
        footer={[
          <Button key="reset" onClick={() => {
            form.resetFields()
            form.setFieldsValue(userInfo)
          }}>重置</Button>,
          <Button key="submit" type='primary' loading={confirmLoading} onClick={handleOk}>提交</Button>
        ]}
      >
        <Form form={form} 
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
          <Form.Item name="username" label="用户名称">
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Select>
              <Select.Option value="女">女</Select.Option>
              <Select.Option value="男">男</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="年龄" name="age">
            <InputNumber placeholder='请输入' />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[
            {type: 'email', message: '邮箱格式不正确'}
          ]}>
            <Input placeholder='请输入' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagePerson