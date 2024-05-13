import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './questionBank.module.scss'
import { Button, Space, message, Form, Select, Input, Typography, Popconfirm, Table } from 'antd'
import { getQuesListApi, getClassfiyTypeApi } from '@/api/questionMagege'
import { SaveEditableAction } from '@ant-design/pro-utils/es/useEditableArray'
import ProConfigContext from '@ant-design/pro-provider'


// eslint-disable-next-line react/prop-types
const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  // eslint-disable-next-line react/prop-types
  const opts = (record && record.options) ? record['options']?.map(v => {
    return {
      label: v,
      value: v
    }
  }) : []
  // console.log('record', record)
  const inputNode = inputType === 'select' ? <Select options={opts} /> : <Input />
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


const QuestionBank = () => {
  const navigate = useNavigate()
  const [pageObj, setPageObj] = useState({ page: 1, pagesize: 10 })
  const [searObj, setSearObj] = useState({})
  const [total, setTotal] = useState(0)
  const [totalPage, setTotalP] = useState(0)
  const [queslist, setQuesList] = useState([])
  const [tableL, setTableL] = useState(false)
  const [typeClassify, setTypeClassify] = useState([])  //科目列表
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record) => record.key === editingKey

  // 获得所有科目类型
  const getClassfiyType = async () => {
    try {
      const res = await getClassfiyTypeApi()
      // console.log('科目类别', res.data.data.list)
      if (res.data.code === 200) {
        setTypeClassify(res.data.data.list)
      } else {
        message.error(res.data.msg)
      }
    } catch (e) {
      console.log('科目类别', e)
    }
  }
  // 对科目数据进行去重,处理
  const trueClassify = useMemo(() => {
    const trueC = []
    typeClassify.forEach(v => {
      if (!trueC.find(x => x.label === v.name)) {
        trueC.push({
          value: v.value,
          label: v.name,
          key: v['_id']
        })
      }
    })
    return trueC
  }, [typeClassify])

  // 获取所有试题列表
  const getQuesAll = async () => {
    try {
      const res = await getQuesListApi(pageObj, searObj)
      console.log('res', res)
      if (res.data.code === 200) {
        setQuesList(res.data.data.list)
        setTotal(res.data.data.total)
        setTotalP(res.data.data.totalPage)
        setTableL(false)
      } else {
        message.error(res.data.msg)
      }
    } catch (e) {
      console.log('试题列表', e)
    }
  }

  const save = () => {
    console.log('保存')
  }

  const edit = (record) => {
    console.log('编辑', record)
    form.setFieldsValue({
      question: '',
      type: '',
      classify: '',
      answer: '',
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    console.log('取消')
    setEditingKey('')
  }

  const handleChange = (page, pageSize) => {
    setEditingKey('')
    setPageObj({page, pagesize: pageSize})
  }

  const delQues = (id) => {
    console.log('删除该数据', id)
  }


  useEffect(() => {
    getQuesAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageObj, searObj])

  const columns = [
    {
      title: "试题列表",
      dataIndex: "question",
      width: "30%",
      editable: true
    },
    {
      title: "分类",
      dataIndex: "type",
      width: "10%",
      editable: true
    },
    {
      title: "题型",
      dataIndex: "classify",
      width: "10%",
      editable: true
    },
    {
      title: "答案",
      dataIndex: "answer",
      width: "15%",
      editable: true
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "35%",
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              <Button type="primary">保存</Button>
            </Typography.Link>
            <Popconfirm title="确定取消吗？" onConfirm={cancel}>
              <Button>取消</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Space>
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                <Button type="primary" size="small">编辑</Button>
              </Typography.Link>
              <Popconfirm title="确定删除该条数据吗" onConfirm={() => delQues(record['_id'])}>
                <Button danger size="small">删除</Button>
              </Popconfirm>
              <Button size="small" >预览试卷</Button>
            </Space>
          </span>
        )
      }
    }
  ]

  const mergedColumns = columns.map(col => {
    if(!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'answer' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  useEffect(() => {
    getQuesAll()
    getClassfiyType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={style.box}>
      <Button type="primary" onClick={() => navigate('/question/create-item')}>添加试题</Button>
      <div className={style.search}>

      </div>
      <div className={style.queslist}>
        <Form form={form} component={false}>
          <Table
            rowKey={record => record['_id']}
            components={{
              body: {
                cell: EditableCell,
              }
            }}
            bordered
            dataSource={queslist}
            columns={mergedColumns}
            pagination={{
              pageSize: pageObj.pagesize,
              pageSizeOptions: [5, 10, 20, 50],
              total: total,
              showTotal: () => `总共${totalPage}条`,
              size: 'small',
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: handleChange
            }}
          />
        </Form>
      </div>
    </div>
  )
}

export default QuestionBank