/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Popconfirm, Table, Space, Modal } from 'antd'
import { getExaninationListApi } from '../../../../../../api'
import moment from 'moment'
const EditableContext = React.createContext(null)
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])
  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    })
  }
  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({
        ...record,
        ...values,
      })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }
  let childNode = children
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }
  return <td {...restProps}>{childNode}</td>
}
const TablePath = () => {
  const [list, setList] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = (key) => {
    setIsModalOpen(false)
    handleDelete(key)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }


  const getExamination = async () => {
    const res = await getExaninationListApi()
    if(res.status === 200) {
      const newList = res.data.data.list.map(item => ({
        ...item,
        'key': item._id
      }))
      setList(newList)
    }
  }

  useEffect(() => {
    getExamination()
  }, [])

  const handleDelete = (key) => {
    console.log('删除',key)
    const newData = list.filter((item) => item.key !== key)
    setList(newData)
  }
  const defaultColumns = [
    {
      title: '考试名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      key: 'classify',
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm:ss') : '--'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (s) =>(s === 1 ? '已结束' : '未结束') 
    },
    {
      title: '监考人',
      dataIndex: 'examiner',
      key: 'examiner',
    },
    {
      title: '考试班级',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm:ss') : '--'),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm:ss') : '--'),
    },
    {
      title: '设置',
      key: 'action',
      render: (_, record) => (
        <div>
          <button style={{fontSize: "12px", marginRight: "20px"}}>预览试卷</button>
          {record.status === 1 ? <button disabled style={{fontSize: "12px"}}>删除</button> : 
            <div>
              <Modal title="警告" open={isModalOpen} onOk={() => handleOk(record.key)} onCancel={handleCancel}>
                <p>确定要删除该记录吗？</p>
              </Modal>
              <button style={{fontSize: "12px"}} onClick={() => showModal()}>删除</button>
            </div>
          }
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 1 ? <button style={{fontSize: "12px"}}>成绩分析</button> : <button style={{fontSize: "12px"}}>编辑</button>}
        </Space>
      ),
    }
  ]
  const handleSave = (row) => {
    const newData = [...list]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setList(newData)
  }
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })
  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={list}
        columns={columns}
      />
    </div>
  )
}
export default TablePath