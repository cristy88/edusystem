import React, { useState, useEffect } from 'react'
import style from './Group.module.scss'
import { Input, Button, Select } from 'antd'
import Main from '../son/main/Main'
import {createClass } from '../../../../api' 

const Group = () => {
  const teacherList = [
    {value: '小松', label: '小松'},
    {value: '丞丞', label: '丞丞'},
    {value: '虫虫', label: '虫虫'}
  ]
  const classifyList = [
    {value: 'vue', label: 'vue'},
    {value: 'nodejs', label: 'nodejs'},
    {value: 'react', label: 'react'}
  ]

  const [list, setList] = useState(false)
  const [group, setGroup] = useState([])
  const getClassGroup = async () => {
    const name = '冲冲冲'
    const classify = "nodejs"
    const teacher = "小松"
    const students = [1, 2]
    const res = await createClass({name, classify, teacher, students})
    setGroup(res.config)
    console.log('班级信息', res.config)
  }
  useEffect(() => {
    getClassGroup()
  }, [])

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
  const [SelectValue, setSelectValue] = useState('')
  const [teacherValue, setTeacherValue] = useState('')
  // 重置输入框和下拉框
  const changeSelect = () => {
    setInputValue('')
    setSelectValue('')
    setTeacherValue('')
  }

  // 展示和收起
  const changeList = () => {
    setList(!list)
  }

  return (
    <div className={style.box}>
      <header>
        <span>班级管理 / 班级列表</span>
        <h4>班级列表</h4>
      </header>
      <section>
        <div className={style.inp}>
          <p>班级名称：</p>
          <Input 
            placeholder="请输入" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className={style.inp}>
          <p>老师：</p>
          <Select 
            className={style.tea} 
            showSearch 
            placeholder="请选择"
            optionFilterProp="children"
            value={teacherValue}
            onChange={(value) => setTeacherValue(value)}
            onSearch={onSearch}
            filterOption={filterOption}
            options={teacherList}
          />
        </div>
        { list && 
          <div>
            <div className={style.inp}>
              <p>科目类别：</p>
              <Select 
                className={style.tea} 
                showSearch 
                placeholder="请选择"
                optionFilterProp="children"
                value={SelectValue}
                onChange={(value) => setSelectValue(value)}
                onSearch={onSearch}
                filterOption={filterOption}
                options={classifyList}
              />
            </div> 
          </div>
        }
        <div className={style.btn}>
          <Button onClick={changeSelect}>重置</Button>
          <Button type="primary">查询</Button>
          <Button type="link" onClick={changeList}>{list ? '收起' : '展开'}</Button>
        </div>
      </section>
      <Main teacherList={teacherList} classifyList={classifyList}/>
    </div>
  )
}

export default Group