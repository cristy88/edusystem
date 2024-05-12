import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import style from '../Home.module.scss'

const StudentGroup = () => {
  return (
    <div className={style.childContent}>
      <div className={style.bottom}>
        <Suspense fallback={<div style={{width: '200px', margin: '10px auto 0'}}><Spin tip="Loading" size="large"></Spin></div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default StudentGroup