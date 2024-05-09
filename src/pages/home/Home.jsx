import React, { useEffect } from 'react'
import style from './Home.module.scss'
// import HomeLeft from '../../components/HomeLeft'
import HomeLeft from '../../components/homeLeft'
import { Outlet } from 'react-router-dom'
import { getPersonInfoApi } from '../../api'

const Home = () => {

  const getPersonInfo = async () => {
    const res = await getPersonInfoApi()
    console.log(res)
  }

  // useEffect(() => {
  //   getPersonInfo()
  // }, [])

  return (
    <div className={style.home}>
      <div className={style.menu}>

      </div>
      <div className={style.content}>
        <div className={style.leftCon}>
          <HomeLeft />
        </div>
        <div className={style.rightCon}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home