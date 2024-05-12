import React, { useEffect, useState, Suspense } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import style from '../Home.module.scss'
import { useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const Examination = () => {
  const [nav, setNav] = useState('')
  const loaction = useLocation()

  const navChange = () => {
    if(loaction.pathname === '/exam/create') {
      setNav('创建考试')
    } else if(loaction.pathname === '/exam/record') {
      setNav('考试记录')
    } else if(loaction.pathname === '/exam/invigilate') {
      setNav('在线监考')
    }
  }
  
  useEffect(() => {
    navChange()
  }, [loaction.pathname])


  return (
    <div className={style.childContent}>
      <header className={style.top} style={{padding: 15}}>
        {/* <div><NavLink to='/exam' onClick={() => navChange()}>考试管理</NavLink>/{nav}</div> */}
        <Breadcrumb
          style={{fontSize: 16}}
          items={[
            {
              title: <a href="/exam">考试管理</a>,
            },
            {
              title: <span>{nav}</span>
            }
          ]}
        />
        <h3 style={{lineHeight: "50px"}}>{nav}</h3>
      </header>
      <main className={style.bottom}>
        <Suspense fallback={<div style={{width: '200px', margin: '10px auto 0'}}></div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

export default Examination