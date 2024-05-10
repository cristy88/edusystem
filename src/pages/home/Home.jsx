import React, { useEffect } from 'react'
import style from './Home.module.scss'
import HomeLeft from '@/components/homeLeft/HomeLeft'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import { Layout, Avatar, Space, Dropdown } from 'antd'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons'

const items = [
  {
    key: 'userInfo',
    label: '个人中心',
    icon: <UserOutlined />
  },
  {
    key: 'logout',
    label: "退出登录",
    danger: true,
    icon: <PoweroffOutlined />
  }
]

const Home = () => {
  const dispatch = useDispatch()
  const loading = useSelector(s => s.user.loading)
  const navigate = useNavigate()
  const userInfo = useSelector(s =>  s.user.userInfo)

  useEffect(() => {
    // console.log('获取个人信息')
    dispatch(getUserInfo())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (item) => {
    if (item.key === 'logout') {
      localStorage.removeItem('token')
      navigate('/login')
    } else if (item.key === 'userInfo') {
      navigate('/userManage/personal')
    }
  }

  return (
    <div className={style.home}>
      <div className={style.menu}>
        <div className={style.logo}>
          在线考试管理系统
        </div>
        <div className={style.menuRight}>
          <Dropdown
            className={style.drop}
            menu={{
              items,
              onClick: handleClick
            }}
          >
            <Space>
              <Avatar className={style.avatar} src={userInfo?.avator ? <img src={userInfo.avator} alt='avatar' /> : ''}>
                { userInfo?.username[0] }
              </Avatar>
              {userInfo?.username}
            </Space>
          </Dropdown>
        </div>
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