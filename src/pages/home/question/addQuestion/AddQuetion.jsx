import React, { useEffect, useMemo, useRef } from 'react'
import { Tabs, message, Upload, Space, Button } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import * as XSLX from 'xlsx'
import { createQuesMultApi } from '@/api/questionMagege'
import SingleAddQues from './components/singleAddQues/SingleAddQues'
const { Dragger } = Upload

const AllPush = () => {
  const props = useRef()

  const createQuesMult = async () => {
    const res = await createQuesMultApi()
    console.log(res)
  }

  const handleUpload = async (file) => {
    console.log(file)
    let resData = []
    // 读取文件
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = e => {
      try {
        const {result} = e.target
        console.log('result', result)
        const formdata = new FormData()
        formdata.append('file', result)
        console.log('formdata', formdata)
        const workbook = XSLX.read(result, {type: 'binary'})
        for(const sheet in workbook.Sheets) {
          resData = XSLX.utils.sheet_add_json(workbook.Sheets[sheet])
        }
        console.log('resData1111111111', resData)
        // upload(resData)
      } catch(e) {
        console.log('上传文件错误', e)
      }
    }
  }

  const propsUpdate = useMemo(() => {
    return {
      name: 'file',
      accept: 'application/vnd.ms-excel',
      multiple: true,
      showUploadList: true,
      beforeUpdate: async (file) => {
        await handleUpload(file[0])
        return false
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files)
      },
    }
  }, [])

  return (
    <div style={{padding: '20px', background: 'white', margin: '10px 0'}}>
      <span>上传excel批量导入</span>
      <Dragger {...propsUpdate}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
        <p className="ant-upload-hint">
          支持单次或批量上传
        </p>
      </Dragger>
      <Space style={{marginTop: '10px'}}>
        <Button type="primary">提交</Button>
        <Button>重置</Button>
      </Space>
    </div>
  )
}

const AddQuetion = () => {
  return (
    <div style={{padding: '10px 20px 0'}}>
      <Tabs
        defaultActiveKey='1'
        type="card"
        size="middle"
        style={{marginBottom: 32}}
        items={[
          {
            label: '手动添加',
            key: '1',
            children: <SingleAddQues />
          },
          {
            label: '批量导入',
            key: '0',
            children: <AllPush />
          }
        ]}
      ></Tabs>
    </div>
  )
}

export default AddQuetion