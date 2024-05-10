import React, { useEffect, Suspense, useState, useRef } from 'react'
// import { getExaninationListApi } from '../../../../api'
import style from './create.module.scss'
import {
  Button,
  message,
  Steps,
  Table,
  Radio,
  Form
} from 'antd'
import moment from 'moment'
import ExamInfo from './components/emaxInfo/ExamInfo'
import ExamConfig from './components/examConfig/ExamConfig'

const Create = () => {

  const steps = [
    {
      title: '考试基本信息',
      content: '',
    },
    {
      title: '配置试卷',
      content: '',
    },
    {
      title: '发布考试',
      content: '',
    },
  ]
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)
  const [formInfo, setFormInfo] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  // 触发表单项的校验
  const formVal = () => {
    // 触发表单项的校验
    form.validateFields()
      .then((values) => {
        setFormInfo(values)
        setCurrent(current + 1)
      })
      .catch((errorInfo) => {
        // 如果校验失败，则捕获错误信息，并提示用户
        // message.error('Please complete the required fields!')
      })
    console.log('表单数据', formInfo, '科目分类', formInfo.classify)
  }

  useEffect(() => {
    setSelectedRowKeys([])
  }, [formInfo.classify])

  // 配置试卷
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('选择行: ', selectedRows)
      setSelectedRowKeys(selectedRowKeys)
    },
    selectedRowKeys
  }

  const handleNext = () => {
    // 确保至少选中一行
    if (selectedRowKeys.length > 0) {
      setCurrent(current + 1)
    } else {
      // 如果没有选中行，则提示用户
      alert('请选择其中一套试卷')
    }
  }
  const prev = () => {
    setCurrent(current - 1)
  }

  console.log(formInfo)

  return (
    <div className={style.create}>
      <Form
        style={{
          margin: 20,
          padding: 30 ,
          background: '#ffffff',
        }}
        form={form}
        layout="vertical"
      >
        <Steps current={current} items={items} style={{padding: 30}}/>
        <div className={style.content}>
          { steps[current].title === "考试基本信息" &&
          <ExamInfo formVal={formVal} />
          }
          { steps[current].title === "配置试卷" &&
          <ExamConfig prev={prev} handleNext={handleNext} rowSelection={rowSelection} formInfo={formInfo}/>
          }
          { steps[current].title === "发布考试" &&
            <div  style={{margin: 30}} className={style.disposition}>
              <h3>配置信息</h3>
              <p>考试名称：{formInfo.name}</p>
              <p>科目分类：{formInfo.classify}</p>
              <p>监考人员：{formInfo.examiner}</p>
              <p>班级：{formInfo.group}</p>
              <p>考试时间：{formInfo.ExamTime.map(item => 
                // console.log(item)
                <span key={item}>{+item.$d ? moment(+item.$d).format('YYYY-MM-DD kk:mm:ss') : '--'} / </span>
              )}</p>
              <div
                style={{
                  marginTop: 24,
                }}
              >
                <Button
                  style={{
                    marginRight: '8px',
                  }}
                  onClick={() => prev()}
                >
                  上一步
                </Button>
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  提交
                </Button>
              </div>
            </div>
          }
        </div>
      </Form>
    </div>
  )
}

export default Create