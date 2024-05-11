import React, { useEffect, useState, Suspense } from 'react'
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
    if(loaction.pathname === '/exam/create') {
      setNav('创建考试')
    } else if(loaction.pathname === '/exam/record') {
      setNav('考试记录')
    } else if(loaction.pathname === '/exam/invigilate') {
      setNav('在线监考')
    }
  }

  return (
    <div className={style.examination}>
      <header>
        <div><NavLink to='/examination' onClick={() => navChange()}>考试管理</NavLink>/{nav}</div>
        <h4>{nav}</h4>
      </header>
      <main>
        <Suspense fallback={<div style={{width: '200px', margin: '10px auto 0'}}></div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

export default Examination