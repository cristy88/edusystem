import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './questionBank.module.scss'
import { Button } from 'antd'

const QuestionBank = () => {
  const navigate = useNavigate()
  return (
    <div className={style.box}>
      <Button type="primary" onClick={() => navigate('/question/create-item')}>添加试题</Button>
      <div className={style.search}>

      </div>
      <div className={style.queslist}>

      </div>
    </div>
  )
}

export default QuestionBank