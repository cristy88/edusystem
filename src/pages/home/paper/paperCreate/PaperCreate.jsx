import React,{useEffect, useState} from 'react'
import style from './paperCreate.module.scss'
import { Button, message, Steps, Form, Empty} from 'antd'
import { paperCreateApi, queryStudent } from '../../../../api'
import PaperInfo from './paperSteps/PaperInfo'
import ShowPaperInfo from './showPaperInfo/ShowPaperInfo'


const PaperCreate = () => {
  const steps = [
    {
      title: '试卷基础信息',
      content: '',
    },
    {
      title: '展示试卷基本信息',
      content: ''
    },
  ]

  const [form] = Form.useForm()
  const [paperName,setPaperName] = useState('')
  const [paperRemark,setPaperRemark] = useState('')
  const [current, setCurrent] = useState(0)
  const [messageApi,contentHolder] = message.useMessage()
  const [formInfo,setFormInfo] = useState({}) //创建好的试卷的信息
  const [checkedQuestions,setCheckedQuestions] = useState([])
  const [id,setId] = useState([])
  const [classify,setClassify] = useState('')
  const [date,setDate] = useState(0)
  const [name,setName] = useState('')
  const [questions,setQuestions] = useState([])

  const prev = () => {
    setCurrent(current - 1)
  }
  const formVal = (checkedQuestions,checkedId) =>{
    form.validateFields()
      .then((values) => {
        setCurrent(current + 1)
        console.log('通过',values)
        setFormInfo(values)
        setClassify(values.classify.label)
        setCheckedQuestions(checkedQuestions)
        setId(checkedId)
        setQuestions(checkedId)
        setDate(date)
        setName(values.name)
      }).catch(e=>{
        console.log('校验失败',e)
      })
      
  } 
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))
  
  const changeName = (e) => {
    setPaperName(e.target.value)
    
  }
  
  const data = {
    name: formInfo.name,
    classify: classify,
    questions: id
  }
  console.log('values',name)
  console.log('classify',classify)
  // console.log('data',data)

  const createPaper = async (name,classify,questions) =>{
    // console.log(data)
    const date = new Date().getTime()
    const res = await paperCreateApi(name,classify,questions,date)
    if(res.data.code === 200) {
      messageApi.open({
        type: 'success',
        content: '新增成功'
      })
    } else {
      message.error(res.msg)
    }
  }

  return (
    <div className={style.paperCreate}>
      <div className={style.body}>
        <Form form={form}>
          <Steps current={current} items={items} className={style.header}/>
          <div className={style.content} >
            { steps[current].title === '试卷基础信息' && 
             <PaperInfo formVal={formVal} />
            }
            { steps[current].title === '展示试卷基本信息' &&
            <ShowPaperInfo formInfo={formInfo} prev={prev} checkedQuestions={checkedQuestions} createPaper={createPaper} data={data} />
            }
          </div>
        </Form>

      </div>
    </div>
  )
}

export default PaperCreate