import React from 'react'
import {
  ProForm,
  ProFormUploadDragger
} from '@ant-design/pro-components'

const TestForm = () => {
  return (
    <div>
      <ProForm onFinish={values => console.log('提交表单', values)}>
        <ProFormUploadDragger name="drag-pic" label="上传excel批量导入" rules={[{required: true}]} />
      </ProForm>
    </div>
  )
}

export default TestForm