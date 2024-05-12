import React, { useEffect, useRef, useState } from 'react'
import { Tabs, message } from 'antd'
import * as XLSX from 'xlsx'
import { createQuesMultApi } from '@/api/questionMagege'
import SingleAddQues from './components/singleAddQues/SingleAddQues'
import {
  ProForm,
  ProFormUploadDragger
} from '@ant-design/pro-components'


const AllPush = () => {
  const [form] = ProForm.useForm()
  const [num, setNum] = useState(0)
  const [tn, setTn] = useState(-1)

  const createAllQues = async (data) => {
    const res = await createQuesMultApi(data)
    // console.log('res上传', res)
    if (res.data.code === 200) {
      setNum(num => num + 1)
    }
  }

  // 对上传的文件进行处理
  const handleUpdate = (originfile) => {
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
        // console.log('resData1111111111', resData)
        const trueData = {list: []}
        resData.forEach(arr => {
          arr.forEach(v => {
            if (v.type === 4) {
              v.options = [v.options + '']
            } else {
              // console.log(v)
              v.options = v.options.split(',')
            }
            Object.keys(v).map(k => {
              if (k !== 'options') {
                v[k] = v[k] + ''
              }
            })
            trueData.list.push(v)
          })
        })
        // console.log('处理后的数据', trueData)
        // 批量上传试卷
        createAllQues(trueData)
        // upload(resData)
      } catch(e) {
        console.log('上传文件错误', e)
      }
    }
  }

  // 点击上传
  const handleSubmit = async (value) => {
    console.log(value)
    setTn(value.dragXlsx.length)
    setNum(0)
    value.dragXlsx.forEach(v => {
      handleUpdate(v.originFileObj)
    })
  }

  useEffect(() => {
    console.log('num, td', num, tn)
    if (num === tn) {
      // console.log('上传成功')
      message.success('文件上传成功')
      form.resetFields()
      setTn(-1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, tn])

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
          }
        ]}
      ></Tabs>
    </div>
  )
}

export default AddQuetion