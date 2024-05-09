import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './paperManage.module.scss'
import { useSelector } from 'react-redux'

const PaperManage = () => {
  const paper = useSelector(s=>s.paper)

  console.log(paper)
  return (
    <div className={style.paperManage}>
      <header >试卷管理</header>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default PaperManage