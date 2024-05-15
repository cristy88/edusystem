/* eslint-disable react/prop-types */
import React,{useState} from 'react'
import { Button,Empty,Table,Form } from 'antd'
import style from './show.module.scss'
import { NavLink } from 'react-router-dom'

const ShowPaperInfo = (props) => {
  //eslint-disable-next-line react/prop-types
  const {formInfo,prev,checkedQuestions,createPaper,data} = props
  // const [date,setDate] = useState(0)

  const finish = ()=>{
    const date =  parseInt((new Date().getTime()).toString())
    console.log('时间',date)
    Object()
    createPaper(data,date)
  }
  // console.log('时间',date)
  console.log(data)
  const columns = [
    {
      title: '试题',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: '题型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
    },  
  ]

  return (
    <div  style={{margin: 30}} className='disposition'>
      <Form>

      </Form>
      <div className={style.third}> 
        <h3>试卷信息</h3>
        <div className={style.paperInfo}>
          <div className=''>试卷名称：{formInfo.name}</div>
          <div>试卷科目：{formInfo.classify.label}</div>
          <div>备注：{formInfo.remark}</div>
        </div>
        <div>
          <Table dataSource={checkedQuestions} columns={columns} />
        </div>
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        <Button type="primary" onClick={()=>finish()}  >
          <NavLink to={'/paper/paper-bank'}>完成</NavLink>
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
  )
}

export default ShowPaperInfo