import React, { useEffect, useState } from 'react'
import style from './list.module.scss'
import SearchForm from './components/searchPath/SearchForm'
import TablePath from './components/tablePath/TablePath'

const List = () => {

  return (
    <div className={style.list}>
      {/* <Form
        {...formItemLayout}
        style={{
          margin: 20,
          padding: 30 ,
          background: '#ffffff',
        }}
        layout="vertical"
      >
        <div className={style.search}>
          <div className={style.antCol}>
            <Form.Item
              label="考试名称"
              name="name"
            >
              <Input />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="科目分类"
              name="classify"
            >
              <Select placeholder="请选择">
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="usa">U.S.A</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="创建者"
              name="creator"
            >
              <Input />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="创建时间"
              name="createTime"
            >
              <RangePicker placeholder="请选择" showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="状态"
              name="status"
            >
              <Select placeholder="请选择">
                <Select.Option value="0">未开始</Select.Option>
                <Select.Option value="1">已结束</Select.Option>
                <Select.Option value="2">进行中</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="监考人"
              name="examiner"
            >
              <Input />
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="考试班级"
              name="group"
            >
              <Select placeholder="请选择">
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="usa">U.S.A</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={style.antCol}>
            <Form.Item
              label="考试时间"
              name="examTime"
            >
              <RangePicker placeholder="请选择" showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </div>
          
          <div className={style.antCol}>
            <Form.Item>
              <Button type="default" style={{marginRight: 10}}>
                重置
              </Button>
              <Button type="primary">
                查询
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form> */}
      <SearchForm />
      <div className={style.table}>
        <p>考试记录</p>
        <div className={style.tableCont}>
          <TablePath />
        </div>
      </div>
      
    </div>
  )
}

export default List