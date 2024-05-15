import React, { useState ,useEffect, useRef, useMemo} from 'react'
import {Form,Input,Select,Button, message,Modal,Table} from 'antd'
import { getClassifyListApi} from '../../../../../api'
import { getQuesListApi } from '../../../../../api/questionMagege'

// eslint-disable-next-line react/prop-types
const PaperInfo = ( {formVal} ) => {
  const [classifyList,setClassifyList] = useState([])
  const [questionsList,setQuestionsList] = useState([])
  const [query,setQuery] = useState({page: 1,pagesize: 100})
  const [question,setQuestion] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [condition,setCondition] = useState([]) //
  const [selectQuestions,setSelectQuestions] = useState([]) //选中科目的题
  const [checkedQuestions,setCheckedQuestions] = useState([]) //选中试卷上的题
  const [checkedId,setCkeckedId] = useState([])//选中试卷上的题的id
  


  const getData = async () =>{
    const res1 = await getQuesListApi(query, question)
    console.log(res1)
    const res2 = await getClassifyListApi()
    
    if(res1.data.code === 200){
      setQuestionsList(res1.data.data.list)
      setClassifyList(res2.data.data.list)
    } else {
      message.error(res1.data.msg)
    }
    console.log(res1)
  }

  const handleChange = (value) =>{
    console.log(value.label)
    setCondition(value.label)
    setSelectQuestions(questionsList.filter(v=>v.classify  === value.label))
  }

  useEffect(()=>{
    getData()
  },[])

  //   useEffect(() => {
  //     trueSel.current[cruIndex] = classifyList[cruIndex]
  //   }, [classifyList])
  
  const options = useMemo(()=>{
    const base = [
      {
        value: '一级',
        label: 'fff'
      }
    ]
    return base.concat(classifyList.map(v=>({
      label: v.name,
      value: v.value
    })))
  },[classifyList])
  console.log(selectQuestions)
  const columns = [
    {
      title: '试题',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: '题型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
    },  
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`选中的试题id: ${selectedRowKeys}`, '选中的试题: ', selectedRows)
      setCheckedQuestions(selectedRows)
      setCkeckedId(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }
  console.log(checkedQuestions)

  return (
    <div>
      <Form.Item
        name="name" 
        label="试卷名称" 
        rules={[
          {
            required: true,
            message: '请输入试卷名!'
          },
        ]}>
        <Input placeholder='请填写试卷名称' />
      </Form.Item>
      <Form.Item
        name='classify'
        label='考试科目'
        rules={[
          {
            required: true,
            message: '请选择试卷科目!'
          },
        ]}
      >
        <Select 
          style={{
            width: 120,
          }}
          allowClear
          // eslint-disable-next-line no-undef
          //   value={labelInValue}
          labelInValue
          options={options}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        name='questions'
        label='考试试题'
      >
        <Button onClick={()=>{
          setIsModalOpen(true)
        }}>选择试题</Button>
      </Form.Item>
      <Form.Item
        name="remark" 
        label="备注" 
      >
        <Input.TextArea placeholder='请填写备注' rows={6} />
      </Form.Item>
      <Button type="primary" onClick={() => formVal(checkedQuestions,checkedId)}>
              下一步
      </Button>
      <Modal 
        title="Basic Modal" 
        open={isModalOpen} 
        onOk={()=>{setIsModalOpen(false)}} 
        onCancel={()=>{setIsModalOpen(false)}}>
        <Table
          rowKey={(record,index)=>record._id}
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={selectQuestions}
        />
      </Modal>
    </div>
  )
}

export default PaperInfo