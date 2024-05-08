import React, { useState } from 'react'
import style from './StudentGroup.module.scss'
import { Input, Button, Select } from 'antd'
import Main from './son/main/Main'

const StudentGroup = () => {
  const [list, setList] = useState(false)

  const changeList = () => {
    setList(!list)
  }

  return (
    <div className={style.box}>
      <header>
        <span>班级管理 / </span>
        <h3>班级列表</h3>
      </header>
      <section>
        <div className={style.inp}>
          <p>班级名称：</p>
          <Input placeholder="请输入" />
        </div>
        <div className={style.inp}>
          <p>老师：</p>
          <Select className={style.tea} showSearch placeholder="请选择"/>
        </div>
        { list && 
          <div>
            <div className={style.inp}>
              <p>科目类别：</p>
              <Select className={style.obj} showSearch placeholder="请选择"/>
            </div> 
          </div>
        }
        <div className={style.btn}>
          <Button>重置</Button>
          <Button type="primary">查询</Button>
          <Button type="link" onClick={changeList}>{list ? '收起' : '展开'}</Button>
        </div>
      </section>
      <Main />
    </div>
  )
}

export default StudentGroup