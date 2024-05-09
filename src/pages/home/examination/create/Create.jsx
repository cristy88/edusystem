import React, { useEffect, Suspense, useState } from 'react'
import { getExaninationListApi } from '../../../../api'
import style from './create.module.scss'
import {
  Button,
  message,
  Steps,
  Table,
  Radio,
  Form
} from 'antd'
import ExamInfo from './components/emaxInfo/ExamInfo'

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
  const [list, setExamList] = useState([])
  const [current, setCurrent] = useState(0)
  const [formInfo, setFormInfo] = useState({})
  const [selectionType, setSelectionType] = useState('radio')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const getExaninationList = async () => {
    const res = await getExaninationListApi()
    // console.log('考试记录',res.data.data.list)
    setExamList(res.data.data.list)
  }

  useEffect(() => {
    getExaninationList()
  }, [])

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }

  const formVal = () => {
    // 触发表单项的校验
    form.validateFields()
      .then((values) => {
        setFormInfo(values)
        next()
      })
      .catch((errorInfo) => {
        // 如果校验失败，则捕获错误信息，并提示用户
        // message.error('Please complete the required fields!')
      })
  }
  
  console.log('表单数据', formInfo)

  // 配置试卷数据
  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      key: 'classify',
      width: 200
    },
    {
      title: '试卷创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 220
    },
    {
      title: '试卷创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      width: 300,
      render: (text) => <p>{new Date().toLocaleString(list.createTime)}</p>,
    }
  ]
  const val = list.filter(v => v.classify === formInfo.classify)

  const rowSelection = {
    onChange: (newSelectedRowKeys, selectedRows) => {
      console.log(newSelectedRowKeys)
      // setSelectedRowKeys(newSelectedRowKeys)
      // console.log(`选中行的key: ${newSelectedRowKeys}`, '选中的行: ', selectedRows)
      // next()
      
      // if (selectedRowKeys) {
      //   // 如果没有选择任何行，则提示用户
      //   message.error('Please select at least one row!')
      // } else {
      //   // 如果有选择的行，则可以进行下一步操作
      //   // 这里可以添加跳转逻辑，例如使用React Router进行页面跳转
      //   console.log(selectedRowKeys)
      //   setSelectedRowKeys(selectedRows)
      //   console.log(`选中行的key: ${newSelectedRowKeys}`, '选中的行: ', selectedRows)
      //   next()
      // }
    }
  }


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
            <div  style={{margin: 30}}>
              <Radio.Group
                value={selectionType}
              >
              </Radio.Group>

              <Table
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={val}
              />
              <div>
                <Button
                  style={{
                    marginRight: '8px',
                  }}
                  onClick={() => prev()}
                >
                  上一步
                </Button>
                <Button type="primary" onClick={() => rowSelection.onChange()}>
                  下一步
                </Button>
              </div>
            </div>
          }
          { steps[current].title === "发布考试" &&
            <div  style={{margin: 30}} className={style.disposition}>
              <h3>配置信息</h3>
              <p>考试名称：</p>
              <p>科目分类：</p>
              <p>监考人员：</p>
              <p>班级：</p>
              <p>考试时间：</p>
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