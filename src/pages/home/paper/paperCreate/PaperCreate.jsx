import React,{useState} from 'react'
import style from './paperCreate.module.scss'
import { Button, message, Steps, Form, Input ,Select,} from 'antd'
import { paperCreateApi } from '../../../../api'


const PaperCreate = () => {
  const steps = [
    {
      title: '试卷基础信息',
      content:
       <div className={style.first}>
         <Form className={style.form}  layout="vertical" autoComplete="off">
           <Form.Item
             className={style.papername}
             name="paper-name" 
             label="试卷名称" 
             labelWrap= 'true'
             rules={[
               {
                 required: true,
               },
             ]}>
             <Input placeholder='请填写试卷名称' />
           </Form.Item>
           <Form.Item
             name="paper-remark" 
             label="备注" 
           >
             <Input.TextArea placeholder='请填写备注' rows={6} />
           </Form.Item>
         </Form>
  
       </div>,
    },
    {
      title: '选择试卷的方式&科目',
      content: 
        <div className={style.second}> 
          <Form className={style.form}  layout="vertical" autoComplete="off">
            <Form.Item
              className={style.papername}
              name="paper-classify" 
              label="考试科目" 
              rules={[
                {
                  required: true,
                },
              ]}>
              <Select
                mode="tags"
                style={{
                  width: '100%',
                }}
                placeholder="考试科目"
              />
            </Form.Item>
          </Form>
        </div>,
    },
    {
      title: '展示试卷基本信息',
      content: 
      <div className={style.third}> 
        <h3>试卷信息</h3>
        <div className={style.paperInfo}>
          <div className=''>试卷名称：</div>
          <div>试卷科目：</div>
          <div>备注：</div>
        </div>
      </div>,
    },
  ]


  const [paperName,setPaperName] = useState('')
  const [paperRemark,setPaperRemark] = useState('')
  const [current, setCurrent] = useState(0)
  const [messageApi,contentHolder] = message.useMessage()
  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
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
        <Steps current={current} items={items} className={style.header}/>
        <div className={style.content} >{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next(setCurrent(current + 1))}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              完成
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              上一步
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaperCreate