import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import style from './examination.module.scss'
import { useLocation } from 'react-router-dom'

const Examination = () => {
  const [nav, setNav] = useState('')
  const loaction = useLocation()

  useEffect(() => {
    navChange()
  }, [loaction.pathname])

  const navChange = () => {
    if(loaction.pathname === '/examination/create') {
      setNav('创建考试')
    } else if(loaction.pathname === '/examination/list') {
      setNav('查询考试列表')
    } else if(loaction.pathname === '/examination/detail') {
      setNav('查询考试详情')
    }
  }

  return (
    <div className={style.examination}>
      <header>
        <div onChange={navChange}><NavLink to='/examination'>考试管理/{nav}</NavLink></div>
        <h4>{nav}</h4>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Examination