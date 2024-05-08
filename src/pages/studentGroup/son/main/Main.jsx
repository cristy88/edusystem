import React, { useState } from 'react'
import style from './Main.module.scss'
import { Button, Drawer } from 'antd'
import { RedoOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'


const Main = () => {

  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }


  return (
    <div className={style.box}>
      <header>
        <>
          <Button className={style.btn} type="primary" onClick={showDrawer}>+ 新建班级</Button>
          <Drawer title="新建班级" onClose={onClose} open={open}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </>
        <p><RedoOutlined /></p>
        <p><ColumnHeightOutlined /></p>
        <p><SettingOutlined /></p>
      </header>
      <main></main>
    </div>
  )
}

export default Main