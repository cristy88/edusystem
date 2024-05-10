import React, { useEffect, useState } from 'react'
import style from './Stu.module.scss'
import { Button, Drawer, Tooltip, Table, Input, Form, InputNumber, Popconfirm, Typography } from 'antd'
import { RedoOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'

const originData = []
const studentName = ['王', '松', '萌', '红', '丽', '芳']
const ageStudent = () => {
  return Math.floor(Math.random() * (30 - 20 + 1)) + 20
}
const sexStudent = () => {
  const sexs = ['女', '男']
  return sexs[Math.floor(Math.random() * sexs.length)]
}
for (let i = 1; i < 100; i++) {
  const name = studentName[i % studentName.length]
  originData.push({
    key: i.toString(),
    name: `小${name}`,
    sex: sexStudent(),
    age: ageStudent(),
    class: `nodejs ${i}`,
  })
}

// eslint-disable-next-line react/prop-types
const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
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
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const Main = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const changeList = () => {

  }

  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
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
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'order', 
      key: 'order',
      width: '6%',
      render: (text, record, index) => index + 1,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: '20%',
      editable: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: '班级',
      dataIndex: 'class',
      width: '20%',
      editable: true,
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
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="删除此行?" onConfirm={cancel}>
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
          <Button className={style.btn} type="primary" onClick={showDrawer}>+ 添加学生</Button>
          <Drawer title="添加学生" onClose={onClose} open={open}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
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