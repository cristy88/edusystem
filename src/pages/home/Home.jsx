import React from 'react'
import style from './Home.module.scss'
import HomeLeft from '../../components/homeLeft'

const Home = () => {
  return (
    <div className={style.home}>
      <div className={style.menu}></div>
      <div className={style.content}>
        <div className={style.leftCon}>
          <HomeLeft />
        </div>
        <div className={style.rightCon}>

        </div>
      </div>
    </div>
  )
}

export default Home