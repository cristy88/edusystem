import React,{useEffect, useState} from 'react'
import style from './paperLibrary.module.scss'
import { Form,Input,Select,Button,Table,Space, message,Popconfirm } from 'antd'
import { getPaperListApi,delPaperApi,updatePaperApi } from '../../../../api'
import SearchForm from '../../../../components/searchForm/SearchForm'

const PaperLibrary = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [paperList,setPaperList] = useState([])
  const [total,setTotal] = useState(0)
  const [query,setQuery] = useState({page: 1 ,pagesize: 10})
  const [filterQuery,setFilterQuery] = useState({})
  const [loading,setLoading] = useState(false)
  const [time,setTime] = useState(0)
  const [current,setCurrent] = useState(0)

  const getPaperList = async () =>{
    setLoading(true)
    const res = await getPaperListApi({...query, ...filterQuery})
    setLoading(false)
    console.log(res)
    if(res.data.code === 200){
      setPaperList(res.data.data.list)
      setTime(res.data.data.list[current].createTime)
      setTotal(res.data.data.total)
    } else {
      messageApi.open({
        type: 'error',
        content: res.data.msg
      })
    }
  }

  const del = async id =>{
    const res = await delPaperApi(id)
    console.log(res)
    if(res.data.code === 200){
      messageApi.open({
        type: 'success',
        content: '删除成功'
      })
      getPaperList()
    } else {
      messageApi.open({
        type: 'error',
        content: res.data.msg
      })
    }
  }  

  useEffect(()=>{
    getPaperList()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query,filterQuery])

  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '试卷科目',
      dataIndex: 'classify',
      key: 'classify',
    },
    {
      title: '总分',
      dataIndex: 'mark',
      key: 'mark',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) =>{
        return (
          <Form>
            <Space>
              <Button type="primary" size="small">编辑</Button>
              <Popconfirm
                title="警告"
                description="你确定要删除这条数据m？"
                onConfirm={() =>{
                  console.log(record._id)
                  del(record._id)}}
                // onCancel={cancel}
                okText="删除"
                cancelText="取消"
              >
                <Button type="primary" danger size="small">删除</Button>
              </Popconfirm>
              <Button size="small">浏览试卷</Button>
            </Space>
          </Form>
        )
      }
    },
  ]

  

  // const timestampToTime = (timestamp) =>{
  //   timestamp = timestamp ? timestamp : null
  //   let date = new Date(timestamp)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  //   let Y = date.getFullYear() + '-'
  //   let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  //   let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  //   let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  //   let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  //   let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  //   return Y + M + D + h + m + s
  // }

  return (
    <div className={style.paperLibrary}>
      <div className={style.btns}>
        <Button type="primary"size="small" >新增试卷</Button>
        <Button type="primary"size="small" >导出excel</Button>
      </div>
      <div className={style.search}>
        <SearchForm 
          onSearch={setFilterQuery} />
      </div>
      <div className={style.main}>
        <Table 
          loading={loading}
          dataSource={paperList}  
          columns={columns} 
          rowKey={record=>record._id}
          pagination={{
            current: query.page,
            pageSize: query.pagesize,
            pageSizeOptions: [10,20,30,50],
            total,
            showTotal: (total) => `共${total}条`,
            onChange: (page,pagesize) =>{
              setQuery({ page, pagesize })
            }
          }}
        />
      </div>
    </div>
  )
}

export default PaperLibrary