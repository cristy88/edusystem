import React, { useEffect, useState } from 'react'
import style from './Main.module.scss'
import { Button, Drawer, Tooltip, Table, Input, Select, Form, InputNumber, Popconfirm, Typography } from 'antd'
import { RedoOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'

const Main = () => {
  const originData = []
  const teacherName = ['王', '卢', '张', '赵', '刘', '宋']
  const className = ['vue', 'nodejs', 'scss', 'css', 'react', 'html']
  for (let i = 1; i < 60; i++) {
    const name = teacherName[i % teacherName.length]
    const names = className[i % className.length]
    originData.push({
      key: i.toString(),
      name: `${names} ${i}`,
      students: 32,
      teacher: `${name}老师`,
      classify: `${names}`
    })
  }

  const teacherList = []
  
  const classifyList = [
    {value: 'vue', label: 'vue'},
    {value: 'nodejs', label: 'nodejs'},
    {value: 'react', label: 'react'}
  ]

  // 侧边栏 新建班级
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  // 列设置
  const changeList = () => {

  }

  // eslint-disable-next-line react/prop-types
  const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
    const selectAfter = (value) => {
      // 在这里处理选择变化后的逻辑，如果需要的话
    }
    const inputNode = editing ? (
      <Form.Item
        name={dataIndex}
        style={{ margin: 0 }}
        rules={[{ required: true, message: `请输入 ${title}` }]}
      >
        {dataIndex === 'teacher' || dataIndex === 'classify' ? (
          <Select 
            options={dataIndex === 'teacher' ? teacherList : classifyList} 
            onChange={selectAfter}
          />
        ) : ( dataIndex === 'student' ? (
          <InputNumber />
        ) : ( <Input /> ) )}
      </Form.Item>
    ) : (children)
    return <td {...restProps}>{inputNode}</td>
  }


  // 编辑模式
  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      students: '',
      teacher: '',
      classify: '',
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
      const teacherValue = row.teacher ? row.teacher.value : ''
      const classifyValue = row.classify ? row.classify.value : ''
      // 更新后的数据
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        newData.splice(index, 1, {
          ...newData[index],
          ...row,
          teacher: teacherValue,
          classify: classifyValue,
        })
      } else {
        newData.push({
          key: key,
          ...row,
          teacher: teacherValue,
          classify: classifyValue,
        })
      }
      setData(newData)
      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  // 表头
  const columns = [
    {
      title: '序号',
      dataIndex: 'order', 
      key: 'order',
      width: '6%',
      render: (text, record, index) => index + 1,
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
      title: '学生人数',
      dataIndex: 'students',
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
          <Button className={style.btn} type="primary" onClick={showDrawer}>+ 新建班级</Button>
          <Drawer title="新建班级" onClose={onClose} open={open} width={'500px'}>
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
            columns={mergedColumns.map((col) => {
              if(!col.editable) {
                return col
              }
              return {
                ...col,
                onCell: (record) => ({
                  record,
                  inputType: col.dataIndex === 'students' ? 'number' : 'text',
                  dataIndex: col.dataIndex,
                  title: col.title,
                  editing: isEditing(record),
                })
              }
            })}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
              pageSize: 5
            }}
          />
        </Form>
      </main>
    </div>
  )
}

export default Main