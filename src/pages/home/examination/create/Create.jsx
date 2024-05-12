import React, { useEffect, useState } from 'react'
import { examinationApi } from '../../../../api'
import style from './create.module.scss'
import { message, Steps, Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import ExamInfo from './components/emaxInfo/ExamInfo'
import ExamConfig from './components/examConfig/ExamConfig'
import ExamPublish from './components/examPublish/ExamPublish'

const Create = () => {

  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)
  const [formInfo, setFormInfo] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState('')
  const [examList, setExamList] = useState([])
  const navigate = useNavigate()

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
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  // 触发表单项的校验
  const formVal = () => {
    form.validateFields()
      .then((values) => {
        setFormInfo(values)
        setCurrent(current + 1)
      })
      .catch((errorInfo) => {
        // 如果校验失败，则捕获错误信息，并提示用户
        // message.error('Please complete the required fields!')
      })
  }

  // 配置试卷
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setExamList({
        ...formInfo,
        'examId': selectedRowKeys[0],
        'startTime': +formInfo.ExamTime[0].$d,
        'endTime': +formInfo.ExamTime[1].$d,
      })
    },
    selectedRowKeys
  }

  useEffect(() => {
    setSelectedRowKeys()
  }, [formInfo])

  const handleNext = () => {
    // 确保选中一行
    if (selectedRowKeys) {
      setCurrent(current + 1)
    } else {
      // 如果没有选中行，则提示用户
      message.warning('未选择')
    }
  }
  const prev = () => {
    setCurrent(current - 1)
  }

  // 发布考试
  const createExam = async () => {
    const res = await examinationApi(examList)
    console.log(res)
    if(res.data.code === 200) {
      message.open({
        type: 'success',
        content: '新增成功'
      })
      navigate('/exam/record')
    }
  }

  return (
    <div className={style.create}>
      <Form
        style={{
          margin: 30,
        }}
        form={form}
        layout="vertical"
      >
        <Steps current={current} items={items} style={{padding: 40}}/>
        <div className={style.content}>
          { steps[current].title === "考试基本信息" &&
          <ExamInfo formVal={formVal} />
          }
          { steps[current].title === "配置试卷" &&
          <ExamConfig prev={prev} handleNext={handleNext} rowSelection={rowSelection} formInfo={formInfo}/>
          }
          { steps[current].title === "发布考试" &&
            <ExamPublish formInfo={formInfo} prev={prev} createExam={createExam}/>
          }
        </div>
      </Form>
    </div>
  )
}

export default Create