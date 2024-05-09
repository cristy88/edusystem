import React, { useEffect, useState } from 'react'
import style from './HomeLeft.module.scss'
import { MenuUnfoldOutlined, MenuFoldOutlined, CrownOutlined, TeamOutlined, SnippetsOutlined, FileUnknownOutlined, FormOutlined } from '@ant-design/icons'
import { Menu, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { selectMenu, getMenu } from '@/store/modules/user'
import { useSelector, useDispatch } from 'react-redux'

// const leftMenu = [
//   {
//     "key": "64420890551cb461cc300fcd",
//     "label": "系统管理",
//     "path": "/userManage",
//     "disabled": false,
//     "__v": 0,
//     "icon": <CrownOutlined />,
//     "children": [
//       {
//         key: "1321323",
//         label: "用户管理",
//         pid: "1321323",
//         path: '/userManage/manage-page'
//       },
//       {
//         "key": "64464e3f0d97d455218c012a",
//         "label": "个人信息",
//         "pid": "64420890551cb461cc300fcd",
//         "path": "/userManage/personal",
//         "disabled": false,
//         "__v": 0
//       },
//       {
//         key: "21w2e23",
//         label: "用户",
//         path: "/userManage/userOptions"
//       }
//     ]
//   },
//   {
//     "key": "64420959551cb461cc30102d",
//     "label": "试题管理",
//     "path": "/question",
//     "disabled": false,
//     "__v": 0,
//     "icon": <SnippetsOutlined />,
//     "children": [
//       {
//         "key": "64463a301a553602aebcc716",
//         "label": "创建科目",
//         "pid": "64420959551cb461cc30102d",
//         "path": "/question/createsubject",
//         "disabled": false,
//         "__v": 0
//       },
//       {
//         "key": "64463a301a553602",
//         "label": "试题库",
//         "pid": "64420959551cb461cc30102d",
//         "path": "/question/questionbank",
//         "disabled": false,
//         "__v": 0
//       },
//       {
//         "key": "64463a301a5",
//         "label": "添加试题",
//         "pid": "64420959551cb461cc30102d",
//         "path": "/question/addquestion",
//         "disabled": false,
//         "__v": 0
//       }
//     ]
//   },
//   {
//     "key": "64420914551cb461cc30100e",
//     "label": "考试管理",
//     "path": "/exam",
//     "disabled": false,
//     "__v": 0,
//     "icon": <TeamOutlined />,
//     "children": [
//       {
//         "key": "6444f64612792c3fb9a2cbff",
//         "label": "创建考试",
//         "pid": "64420914551cb461cc30100e",
//         "path": "/exam/create",
//         "disabled": false,
//         "__v": 0,
//       },
//       {
//         "key": "6444fa7181938efd2855dfeb",
//         "label": "考试列表",
//         "pid": "64420914551cb461cc30100e",
//         "path": "/exam/create",
//         "disabled": false,
//         "__v": 0,
//       }
//     ]
//   }
// ]

const HomeLeft = () => {
  const [collapsed, setCollapsed] = useState(false)
  const menuList = useSelector(selectMenu)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMenu())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  // const onClick = (e) => {
  //   console.log('click', e)
  //   leftMenu.forEach(v => {
  //     if (v.key === e.key) {
  //       return
  //     } else {
  //       v.children.forEach(child => {
  //         if (child.key === e.key) {
  //           navigate(child.path)
  //         }
  //       })
  //     }
  //   })
  // }

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
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={menuList}
        style={{height: '100%'}}
      />
    </div>
  )
}

export default HomeLeft