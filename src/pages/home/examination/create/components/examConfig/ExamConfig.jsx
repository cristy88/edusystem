import React, { useState,useEffect } from 'react'
import { Radio, Table, Button } from 'antd'
import moment from 'moment'
import {getExaninationListApi} from '../../../../../../api'


// eslint-disable-next-line react/prop-types
const ExamConfig = ({prev, handleNext, rowSelection, formInfo}) => {
  const [list, setExamList] = useState([])
  const [val , setVal] = useState([])
  const [params, setParams] = useState({})

  const getExaninationList = async () => {
    // eslint-disable-next-line react/prop-types
    const newParams = formInfo.classify
    setParams(newParams)
    const res = await getExaninationListApi({params})
    const examList = res.data.data.list.map((item) => ({
      ...item,
      'key': item._id
    }))
    setExamList(examList)
    // 筛选
    // eslint-disable-next-line react/prop-types
    const newVal = examList.filter(v => v.classify === formInfo.classify)
    setVal(newVal)
    console.log('配置数据',newVal)
  }

  useEffect(() => {
    getExaninationList()
  }, [formInfo])

  // 配置试卷数据
  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      key: 'classify',
      width: 200
    },
    {
      title: '试卷创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 220
    },
    {
      title: '试卷创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      width: 300,
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm:ss') : '--'),
    }
  ]

  return (
    <div  style={{margin: 30}}>
      <Radio.Group />
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection
        }}
        columns={columns}
        dataSource={val}
      />
      <div>
        <Button
          style={{
            marginRight: '8px',
          }}
          onClick={() => prev()}
        >
          上一步
        </Button>
        <Button type="primary" htmlType='submit' onClick={() => handleNext()}>
          下一步
        </Button>
      </div>
    </div>
  )
}

export default ExamConfig