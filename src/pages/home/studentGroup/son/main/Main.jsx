/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import style from './Main.module.scss'
import { Button, Drawer, Tooltip, Table, Input, Select, Form, InputNumber, Popconfirm, Typography } from 'antd'
import { RedoOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import { ListClass } from '../../../../../api/index'
import moment from 'moment'
import AddClass from './addClass/AddClass'

// 可编辑单元格
const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  // 如果是序号列，不渲染输入框，只显示序号
  if (dataIndex === 'index') {
    return <td {...restProps}>{index + 1}</td>
  }
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : ( children )}
    </td>
  )
}

const Main = () => {
  const [open, setOpen] = useState(false)    //侧边栏
  const [group, setGroup] = useState({page: 1, pagesize: 10})    // 展示班级列表
  const [groupList, setGroupList] = useState([])    // 班级列表
  const [total,setTotal] = useState(0)   // 列表总条数
  const [data, setData] = useState([])
  const [form] = Form.useForm()   
  const [editingKey, setEditingKey] = useState('')
  
  // 班级列表接口
  const getClassList = async () => {
    const res = await ListClass({...group, ...groupList})
    if (res.data.code === 200) {
      setData(res.data.data.list)
      // setTimeout(res.data.data.list[current].createTime)
      setTotal(res.data.data.total)
    }
    // console.log('班级信息', res.data.data.list)
  }
  useEffect(() => { 
    getClassList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, groupList])

  // 侧边栏 新建班级
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  // 列设置
  const changeList = () => {
    
  }

  const isEditing = (record) => record.key === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      teacher: '',
      classify: '',
      createTime: '',
      ...record,
    })
    setEditingKey(record.key)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
      } else {
        newData.push(row)
      }
      setData(newData)
      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  // 表格的列
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1, 
      width: '6%',
    },
    {
      title: '班级名称',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: '老师',
      dataIndex: 'teacher',
      width: '20%',
      editable: true,
    },
    {
      title: '科目类别',
      dataIndex: 'classify',
      width: '20%',
      editable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '20%',
      // editable: true,
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm') : '--')      
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8, }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="删除此行 ?" onConfirm={cancel}>
              <a>删除</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <div className={style.box}>
      <header>
        <>
          <Button className={style.btn} type="primary" onClick={showDrawer}>+ 新建班级</Button>
          <Drawer title="新建班级" onClose={onClose} open={open} width={'500px'}>
            <AddClass />
          </Drawer>
        </>
        <>
          <Tooltip title="刷新">
            <span><RedoOutlined style={{ fontSize: '16px', color: '#000000' }}/></span>
          </Tooltip>
          <Tooltip title="密度">
            <span><ColumnHeightOutlined style={{ fontSize: '16px', color: '#000000' }}/></span>
          </Tooltip>
          <Tooltip title="列设置">
            <span><SettingOutlined style={{ fontSize: '16px', color: '#000000' }} onClick={changeList}/></span>
          </Tooltip>
        </>
      </header>
      <main>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            rowKey={record => record.id} 
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
              pageSize: 5,
            }}
          />
        </Form>
      </main>
    </div>
  )
}

export default Main