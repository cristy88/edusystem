import { Link } from 'react-router-dom'
import {  CrownOutlined, AlignCenterOutlined, TeamOutlined, SnippetsOutlined, FileUnknownOutlined, FormOutlined } from '@ant-design/icons'
import React from 'react'

// eslint-disable-next-line react-refresh/only-export-components
const IconPath = {
  '系统管理': <CrownOutlined />,
  '试题管理': <SnippetsOutlined />,
  '班级管理': <TeamOutlined />,
  '考试管理': <FormOutlined />,
  '试卷管理': <FileUnknownOutlined />
}

export const baseMenu = [
  {
    key: '/home',
    title: '监控页面',
    label: '监控页面'
  }
]

export const formatMenu = (list) => {
  return list.map(v => {
    const item = {
      key: v.path,
      label: v.children ? v.name : <Link to={v.path}>{ v.name }</Link>,
      title: v.name,
      icon: IconPath[v.name] ? IconPath[v.name] : ''
    }
    if (v.children) {
      item.children = formatMenu(v.children)
    }
    return item
  })
}