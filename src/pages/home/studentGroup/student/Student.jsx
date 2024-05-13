import React, { useState, useEffect } from 'react'
import style from './Student.module.scss'
import { Input, Button, Select } from 'antd'
import Stu from '../son/stu/Stu'
import { studentClass } from '../../../../api/index'

const Student = () => {
  const [listS, setListS] = useState(false)
  const [groupList, setGroupList] = useState({})    // 班级列表
  const [group, setGroup] = useState([])
  const [data, setData] = useState([])   // 渲染数据 
  const [sexOptions, setSexOptions] = useState([])
  const [classNameOptions, setClassNameOptions] = useState([])

  // 学生列表接口
  const getStudentList = async () => {
    const res = await studentClass({...group, ...groupList})
    if (res.data.code === 200) {
      setData(res.data.data.list)
      const sexs = new Set(res.data.data.list.map(item => item.sex))
      const classNames = new Set(res.data.data.list.map(item => item.className))
      setSexOptions(Array.from(sexs).map(sex => (
        <Select.Option key={sex} value={sex}>
          {sex}
        </Select.Option>
      )))
      setClassNameOptions(Array.from(classNames).map(className => (
        <Select.Option key={className} value={className}>
          {className}
        </Select.Option>
      )))
    }
    console.log('学生信息', res.data.data.list)
  }
  useEffect(() => { 
    getStudentList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, groupList])

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
            showSearch 
            placeholder="请选择"
            optionFilterProp="children"
            value={sexValue}
            onChange={(value) => setSexValue(value)}
            onSearch={onSearch}
            filterOption={filterOption}
          >
            {sexOptions}
          </Select>
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
              >
                {classNameOptions}
              </Select>
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