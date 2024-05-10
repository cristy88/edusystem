import React, { useState } from 'react'
import style from './Student.module.scss'
import { Input, Button, Select } from 'antd'
import Stu from '../son/stu/Stu'

const Student = () => {
  const sexList = [
    {value: '女', label: '女'},
    {value: '男', label: '男'}
  ]
  const classList = [
    {value: 'nodejs 1', label: 'nodejs 1'},
    {value: 'nodejs 2', label: 'nodejs 2'},
    {value: 'nodejs 3', label: 'nodejs 3'}
  ]

  const [listS, setListS] = useState(false)

  const changeList = () => {
    setListS(!listS)
  }

  // 下拉菜单的内容
  const onChange = (value) => {
    console.log(`选项 ${value}`)
  }
  const onSearch = (value) => {
    console.log(`搜索 ${value}`)
  }
  const filterOption = (input, option) => 
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  // 输入框和下拉框初始状态
  const [inputValue, setInputValue] = useState('')
  const [sexValue, setSexValue] = useState('')
  const [classValue, setClassValue] = useState('')
  // 重置输入框和下拉框
  const changeSelect = () => {
    setInputValue('')
    setSexValue('')
    setClassValue('')
  }

  return (
    <div className={style.box}>
      <header>
        <span>班级管理 / 学生列表</span>
        <h4>学生列表</h4>
      </header>
      <section>
        <div className={style.inp}>
          <p>姓名：</p>
          <Input 
            placeholder="请输入"  
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className={style.inp}>
          <p>性别：</p>
          <Select 
            className={style.tea} 
            showSearch placeholder="请选择"
            optionFilterProp="children"
            value={sexValue}
            onChange={(value) => setSexValue(value)}
            onSearch={onSearch}
            filterOption={filterOption}
            options={sexList}
          /> 
        </div>
        { listS && 
          <>
            <div className={style.inp}>
              <p>班级：</p>
              <Select 
                className={style.obj} 
                showSearch placeholder="请选择"
                optionFilterProp="children"
                value={classValue}
                onChange={(value) => setClassValue(value)}
                onSearch={onSearch}
                filterOption={filterOption}
                options={classList}
              />
            </div> 
          </>          
        }
        <div className={style.btn}>
          <Button onClick={changeSelect}>重置</Button>
          <Button type="primary">查询</Button>
          <Button type="link" onClick={changeList}>{listS ? '收起' : '展开'}</Button>
        </div>
      </section>
      <Stu />
    </div>
  )
}

export default Student