import React, { useRef, useState } from 'react'
import style from './HomeLeft.module.scss'
import { MenuUnfoldOutlined, MenuFoldOutlined, CrownOutlined, TeamOutlined, SnippetsOutlined, FileUnknownOutlined, FormOutlined } from '@ant-design/icons'
import { Menu, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const leftMenu = [
  {
    "key": "64420890551cb461cc300fcd",
    "label": "系统管理",
    "path": "/userManage",
    "disabled": false,
    "createTime": 1682049168046,
    "__v": 0,
    "isBtn": false,
    "icon": <CrownOutlined />,
    "children": [
      {
        "key": "64464e3f0d97d455218c012a",
        "label": "个人信息",
        "pid": "64420890551cb461cc300fcd",
        "path": "/userManage/personal",
        "disabled": false,
        "__v": 0
      }
    ]
  },
  {
    "key": "64420914551cb461cc30100e",
    "label": "考试管理",
    "path": "/examination",
    "disabled": false,
    "__v": 0,
    "icon": <TeamOutlined />,
    "children": [
      {
        "key": "6444f64612792c3fb9a2cbff",
        "label": "创建考试",
        "pid": "64420914551cb461cc30100e",
        "path": "/examination/create",
        "disabled": false,
        "__v": 0,
      },
      {
        "key": "6444fa7181938efd2855dfeb",
        "label": "考试列表",
        "pid": "64420914551cb461cc30100e",
        "path": "/examination/list",
        "disabled": false,
        "__v": 0,
      },
      {
        "key": "3e56drygkvhif",
        "label": "查询考试详情",
        "pid": "64420914551cb461cc30100e", 
        "path": "/examination/detail",
        "disabled": false,
        "__v": 0,
      }
    ]
  }
]

const HomeLeft = () => {
  const key = {}
  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const onClick = (e) => {
    console.log('click', e)
    leftMenu.forEach(v => {
      if (v.key === e.key) {
        return
      } else {
        v.children.forEach(child => {
          if (child.key === e.key) {
            navigate(child.path)
          }
        })
      }
    })
  }

  return (
    <div className={style.aside}>
      <div className={style.btn}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        onClick={onClick}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={leftMenu}
      />
    </div>
  )
}

export default HomeLeft