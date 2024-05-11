/* eslint-disable react/prop-types */
import React,{forwardRef, useEffect,useImperativeHandle,useState} from 'react'
import { Table,message } from 'antd'

const TablePro = ({
  columns = [],
  pageQuery = { page: 1, pagesize: 5},
  params = {},//传给接口的
  requsetApi,
  paperList,
  filterQuery,
  ...tableProps
},ref) => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [total,setTotal] = useState(0)
  const [query,setQuery] = useState(pageQuery)
  const [filter,setFilter] = useState(filterQuery)

  const getData = async () =>{
    setLoading(true)
    const res = await requsetApi({...query,...params})
    setLoading(false)
    if(res.data.code === 200){
      const { list , total} = res.data.data
      console.log(res.data.data)
      setTotal(total)
      setData(list)  
    }else{
      message.error(res.msg)
    }
  }
  console.log(paperList)
  




  useEffect(()=>{
    getData()
    
  },[query])
  console.log(ref)
  //给ref添加数据
  useImperativeHandle(ref,()=>{
    //return 的数据会赋值给ref对象 的current 属性
    return{
      getData
    }
  },[query,params])

  return (

    <Table
      loading={loading}
      columns={columns}
      dataSource={paperList}
      rowKey={record => record._id}
      pagination={tableProps.pagination !== undefined ? tableProps.pagination : {
        total,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: t => `共 ${t} 条`,
        current: query.page,
        pageSize: query.pagesize,
        onChange: (page, pagesize) => setQuery({ page, pagesize })
      }}
      {...tableProps}
    />
    
  )
}

export default forwardRef(TablePro)