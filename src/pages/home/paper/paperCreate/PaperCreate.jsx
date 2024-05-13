import React,{useState} from 'react'
import style from './paperCreate.module.scss'
import { Button, message, Steps, Form, Input ,Select,} from 'antd'
import { paperCreateApi } from '../../../../api'
import PaperInfo from './paperSteps/PaperInfo'


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
  const [formInfo,setFormInfo] = useState({})
  // const next = () => {
  //   setCurrent(current + 1)
    
  // }
  const prev = () => {
    setCurrent(current - 1)
  }
  const formVal = () =>{
    form.validateFields()
      .then((values) => {
        setCurrent(current + 1)
        console.log('通过',values)
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


  

  const createPaper = async (values) =>{
    console.log(values)
    const res = await paperCreateApi(values)
    if(res.data.code === 200) {
      messageApi.open({
        type: 'success',
        content: '新增成功'
      })

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
            <div  style={{margin: 30}} className={style.disposition}>
              <div className={style.third}> 
                <h3>试卷信息</h3>
                <div className={style.paperInfo}>
                  <div className=''>试卷名称：</div>
                  <div>试卷科目：</div>
                  <div>备注：</div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 24,
                }}
              >
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    完成
                </Button>
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  onClick={() => prev()}
                >
                    上一步
                </Button>
              </div>
            </div>
            }


          </div>
        </Form>

      </div>
    </div>
  )
}

export default PaperCreate