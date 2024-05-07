import React,{useState} from 'react'
import style from './paperCreate.module.scss'
import { Button, message, Steps, theme } from 'antd'

const steps = [
  {
    title: '试卷基础信息',
    content: 'First-content',
  },
  {
    title: '选择试卷的方式&科目',
    content: 'Second-content',
  },
  {
    title: '展示试卷基本信息',
    content: 'Last-content',
  },
]

const PaperCreate = () => {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
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
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    width: 800
  }

  return (
    <div className={style.paperCreate}>
      <div className={style.body}>
        <Steps current={current} items={items} className={style.header}/>
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaperCreate