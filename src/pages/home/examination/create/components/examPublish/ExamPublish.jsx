/* eslint-disable react/prop-types */
import React from 'react'
import style from '../../create.module.scss'
import { Button } from 'antd'
import moment from 'moment'

const ExamPublish = ({formInfo, createExam, prev}) => {
  return (
    <div  style={{margin: 30}} className={style.disposition}>
      <h3>配置信息</h3>
      <p>考试名称：{formInfo.name}</p>
      <p>科目分类：{formInfo.classify}</p>
      <p>监考人员：{formInfo.examiner}</p>
      <p>班级：{formInfo.group}</p>
      <p>考试时间：{formInfo.ExamTime.map(item =>
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
        <Button type="primary" onClick={() => createExam()}>
          提交
        </Button>
      </div>
    </div>
  )
}

export default ExamPublish