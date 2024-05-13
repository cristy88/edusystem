import React, { useState, useEffect } from 'react'
import style from './Group.module.scss'
import { Input, Button, Select } from 'antd'
import Main from '../son/main/Main'
import { ListClass } from '../../../../api'

const Group = () => {
  const [groupList, setGroupList] = useState({})    // 班级列表
  const [data, setData] = useState([])
  const [teacherOptions, setTeacherOptions] = useState([])
  const [classifyOptions, setClassifyOptions] = useState([])

  // 班级列表接口
  const getClassList = async () => {
    const res = await ListClass({...groupList})
    if (res.data.code === 200) {
      setData(res.data.data.list)
      const teachers = new Set(res.data.data.list.map(item => item.teacher))
      const classifys = new Set(res.data.data.list.map(item => item.classify))
      setTeacherOptions(Array.from(teachers).map(teacher => (
        <Select.Option key={teacher} value={teacher}>
          {teacher}
        </Select.Option>
      )))
      setClassifyOptions(Array.from(classifys).map(classify => (
        <Select.Option key={classify} value={classify}>
          {classify}
        </Select.Option>
      )))
    }
    console.log('班级信息', res.data.data.list)
  }
  useEffect(() => { 
    getClassList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupList])

  const [list, setList] = useState(false)

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
          >
            {teacherOptions}
          </Select>
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
              >
                {classifyOptions}
              </Select>
            </div> 
          </div>
        }
        <div className={style.btn}>
          <Button onClick={changeSelect}>重置</Button>
          <Button type="primary">查询</Button>
          <Button type="link" onClick={changeList}>{list ? '收起' : '展开'}</Button>
        </div>
      </section>
      <Main />
    </div>
  )
}

export default Group