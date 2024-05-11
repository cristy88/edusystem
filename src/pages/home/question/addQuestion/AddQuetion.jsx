import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Tabs, message, Upload, Space, Button } from 'antd'
import * as XLSX from 'xlsx'
import { createQuesMultApi } from '@/api/questionMagege'
import SingleAddQues from './components/singleAddQues/SingleAddQues'
import TestForm from './components/testForm/TestForm'
import {
  ProForm,
  ProFormUploadDragger
} from '@ant-design/pro-components'


const AllPush = () => {
  const props = useRef()
  const [form] = ProForm.useForm()
  const [d, setD] = useState({list: []})

  // 批量创造试卷
  const createQuesMult = async (jsonData) => {
    const res = await createQuesMultApi(jsonData)
    console.log(res)
  }

  // 对上传的文件进行处理
  const handleUpdate = (originfile, trueData) => {
    let resData = []
    // 读取文件
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(originfile)
    fileReader.onload = e => {
      try {
        const result = e.target.result
        // console.log('result', result)
        const formdata = new FormData()
        formdata.append('file', result)
        // console.log('formdata', formdata)
        const workbook = XLSX.read(result, {type: 'binary'})
        // console.log('workbook', workbook)
        workbook.SheetNames.forEach(v => {
          resData.push(XLSX.utils.sheet_to_json(workbook.Sheets[v]))
        }) 
        console.log('resData1111111111', resData)
        trueData.list.push(resData)
        // upload(resData)
      } catch(e) {
        console.log('上传文件错误', e)
      }
    }
  }

  const handleSubmit = (value) => {
    console.log(value)
    const trueData = {list: []}
    const originfile = value.dragXlsx[0].originFileObj
    value.dragXlsx.forEach(v => {
      handleUpdate(v.originFileObj, trueData)
    })
    // handleUpdate(originfile)
    console.log('展示数据', trueData)
  }

  return (
    <div style={{padding: '20px', background: 'white', margin: '10px 0'}}>
      <ProForm onFinish={handleSubmit} form={form}>
        <ProFormUploadDragger
          name="dragXlsx"
          label="上传excel批量导入"
          rules={[{required: true}]}
          onDrop= {(e) => {
            console.log('Dropped files', e.dataTransfer.files)
          }}
        />
      </ProForm>
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
          },
          {
            label: '测试表格',
            key: '2',
            children: <TestForm />
          }
        ]}
      ></Tabs>
    </div>
  )
}

export default AddQuetion