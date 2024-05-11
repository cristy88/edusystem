import React,{useEffect, useRef, useState} from 'react'
import style from './paperLibrary.module.scss'
import { Form,Input,Select,Button,Table,Space, message,Popconfirm } from 'antd'
import { getPaperListApi,delPaperApi,updatePaperApi } from '../../../../api'
import SearchForm from '../../../../components/searchForm/SearchForm'
import TablePro from '../../../../components/TablePro/TablePro'
import moment from 'moment'
import { NavLink } from 'react-router-dom'

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
      console.log('res.data.data.list',res.data.data.list)
      setPaperList(res.data.data.list)
      // setTime(res.data.data.list[current].createTime)
      // setTotal(res.data.data.total)
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
      render: _ => (_ ? moment(_).format('YYYY-MM-DD kk:mm:ss') : '--')
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
                onConfirm={()=>{
                  del(record._id)
                }}
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

  const filterList = [
    {
      label: '试卷名称',
      name: 'name',
      type: 'input',
      placeholder: '请输入名称'
    },
    {
      label: '创建人',
      name: 'creator',
      type: 'select',
      placeholder: '请输入姓名'
    },
    {
      label: '考试科目',
      name: 'classify',
      type: 'select',
      placeholder: '请输入科目'
    },
  ]

  //给组件传的参数
  const tableRef = useRef(null)  
  const [params,setParams] = useState({})

  useEffect(()=>{
    tableRef.current.getData()
    setPaperList()
  },[params])

  return (
    <div className={style.paperLibrary}>
      {/*  */}
      <div className={style.main}>
        <div className={style.btns}>
          <Button type="primary"size="small" to="/paper/create-paper" >
            <NavLink to={'/paper/create-paper'}>新增试卷</NavLink>
            
          </Button>
          <Button type="primary"size="small" >导出excel</Button>
        </div>
        <SearchForm 
          filterList={filterList}
          onSearch={(...value)=>{
            console.log('搜索',value)
            setParams(...value)
          }}
          onReset={(value)=>{
            console.log('重置',value)
            setParams(value)
          }}
        />
        <TablePro 
          ref={tableRef}
          columns={columns}
          requsetApi={getPaperListApi}
          params={params}
          bordered
          pageQuery={ {page: 1,pagesize: 10} }
          paperList={paperList}
          filterQuery
        />

        {/* <Table 
          loading={loading}
          dataSource={paperList}  
          columns={columns} 
          rowKey={record=>record._id}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            current: query.page,
            pageSize: query.pagesize,
            pageSizeOptions: [10,20,30,50],
            total,
            showTotal: (total) => `共${total}条`,
            onChange: (page,pagesize) =>{
              setQuery({ page, pagesize })
            }
          }}
        /> */}
      </div>
    </div>
  )
}

export default PaperLibrary