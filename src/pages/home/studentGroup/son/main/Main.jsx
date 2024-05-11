import React, { useEffect, useState } from 'react'
import style from './Main.module.scss'
import { Button, Drawer, Tooltip, Table, Input, Select, Form, InputNumber, Popconfirm, Typography } from 'antd'
import { RedoOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import { ListClass } from '../../../../../api/index'
import moment from 'moment'

const Main = () => {
  const [open, setOpen] = useState(false)    //侧边栏
  const [group, setGroup] = useState({page: 1, pagesize: 10})    // 展示班级列表
  const [groupList, setGroupList] = useState({})    // 班级列表

  // 班级列表接口
  const getClassList = async () => {
    const res = await ListClass({...group, ...groupList})
    setGroup(res.data.data.list)
    console.log('班级信息', res.data.data.list)
  }
  useEffect(() => { 
    getClassList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, groupList])

  // 侧边栏 新建班级
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  // 列设置
  const changeList = () => {
    
  }


  return (
    <div className={style.box}>
      <header>
        <>
          <Button className={style.btn} type="primary" onClick={showDrawer}>+ 新建班级</Button>
          <Drawer title="新建班级" onClose={onClose} open={open} width={'500px'}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </>
        <>
          <Tooltip title="刷新">
            <span><RedoOutlined style={{ fontSize: '16px', color: '#000000' }}/></span>
          </Tooltip>
          <Tooltip title="密度">
            <span><ColumnHeightOutlined style={{ fontSize: '16px', color: '#000000' }}/></span>
          </Tooltip>
          <Tooltip title="列设置">
            <span><SettingOutlined style={{ fontSize: '16px', color: '#000000' }} onClick={changeList}/></span>
          </Tooltip>
        </>
      </header>
      <main>
        
      </main>
    </div>
  )
}

export default Main