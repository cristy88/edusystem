import React, { useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import { createQuesMultApi } from '@/api/questionMagege'
import { InboxOutlined } from '@ant-design/icons'
import Editable from '../editable/Editable'
import { Form, Input, Row, Col, Space, Button, Upload, message } from 'antd'
const { Dragger } = Upload

const TestUpdate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { trueQuesType, trueClassify } = props
  const [form] = Form.useForm()
  const [num, setNum] = useState(0)
  const [tn, setTn] = useState(-1)
  const [trueAllQues, setTrueAllQues] = useState([])
  const [isUp, setIsUp] = useState(true)  //是否允许上传
  const [isShowUpdate, setShowUpdate] = useState(true)  //是否展示上传区域

  // 批量上传问题
  const createAllQues = async (data) => {
    const res = await createQuesMultApi(data)
    // console.log('res上传', res)
    if (res.data.code === 200) {
      message.success('上传成功')
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
        console.log('resData1111111111', resData)
        // const trueData = {list: []}
        // resData.forEach(arr => {
        //   arr.forEach(v => {
        //     if (v.type === 4) {
        //       v.options = [v.options + '']
        //     } else {
        //       // console.log(v)
        //       v.options = v.options.split(',')
        //     }
        //     Object.keys(v).map(k => {
        //       if (k !== 'options') {
        //         v[k] = v[k] + ''
        //       }
        //     })
        //     trueData.list.push(v)
        //   })
        // })
        // console.log('处理后的数据', trueData)
        // 批量上传试卷
        // createAllQues(trueData)
        // console.log('trueAllQues', trueAllQues)
        setTrueAllQues(trueAllQues => [...trueAllQues, ...resData])
        // upload(resData)
      } catch(e) {
        console.log('上传文件错误', e)
      }
    }
  }

  // 每次上传文件改变时
  const handleChange = (info) => {
    const { status } = info.file
    // 出现错误时
    if (status === 'error') {
      console.log('出现错误',info.file, info.fileList)
      handleUpdate(info.file.originFileObj)
      setNum(num => num + 1)
      setTn(info.fileList.length)
    }
  }

  const handleReset = () => {
    console.log('点击取消')
    setTn(-1)
    setShowUpdate(true)
    setIsUp(true)
    setTrueAllQues([])
  }

  // 点击上传
  const handleSubmit = (value) => {
    console.log('提交数据', value)
    handleReset()
  }

  useEffect(() => {
    if (trueAllQues.length === tn) {
      setShowUpdate(false)
      setIsUp(false)
    }
  }, [trueAllQues, tn])

  useEffect(() => {
    console.log('真实数据', trueAllQues)
  }, [trueAllQues])

  return (
    <div style={{padding: '20px', background: 'white', margin: '10px 0'}}>
      <Form
        onFinish={handleSubmit}
        onReset={handleReset}
        form={form}
        layout="vertical"
      >
        {isShowUpdate && <Form.Item
          name="dragXlsx"
          rules={[{required: true}]}
          label="上传excel文件批量导入"
        >
          <Dragger
            multiple={true}
            onChange={handleChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
            <p className="ant-upload-hint">
              支持单词或批量上传
            </p>
          </Dragger>
        </Form.Item>}
        {
          !isShowUpdate && <Editable data={trueAllQues} trueQuesType={trueQuesType} trueClassify={trueClassify} />
        }
        <Form.Item>
          <Row>
            <Col offset={12} span={12}>
              <Space>
                <Button htmlType="reset">重置</Button>
                <Button type="primary" htmlType="submit" disabled={isUp}>提交</Button>
                <Button >预览提交内容</Button>
              </Space>
            </Col>
          </Row>
        </Form.Item>
      </Form>

    </div>
  )
}

export default TestUpdate