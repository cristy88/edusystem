import React, { useEffect, useState } from 'react'
import { getExaninationListApi } from '../../../../api'
import { Space, Table, Tag } from 'antd'

const List = () => {
  const [list, setList] = useState([])
  const getExamination = async () => {
    const res = await getExaninationListApi()
    if(res.status === 200) {
      setList(res.data.data.list)
    }
  }


  const columns = [
    {
      title: '考试名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '科目分类',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '创建者',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '创建时间',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: '时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '监考人',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '考试班级',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '开始时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '结束时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '设置',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
    },
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

  
  useEffect(() => {
    getExamination()
  }, [])

  return (
    <div>
      {list.map(item => 
        <div key={item._id}>
          {item.group}
          {item.name}
          {item.examiner}
          {item.classify}
        </div>
      )}
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default List