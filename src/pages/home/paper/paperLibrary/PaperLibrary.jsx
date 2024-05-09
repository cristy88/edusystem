import React,{useState} from 'react'
import style from './paperLibrary.module.scss'
import { Form,Input,Select,Button,Table,Space } from 'antd'

const PaperLibrary = () => {
  const [total,setTotal] = useState(0)

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
      dataIndex: 'people',
      key: 'people',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      key: 'action',
      render: () =>{
        return (
          <Space>
            <Button>编辑</Button>
            <Button>删除</Button>
            <Button>浏览试卷</Button>
          </Space>
        )
      }
    },
  ]

  const dataSource = [
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },

    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },

    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },{
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },

    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },

    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
    {
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },{
      key: 1,
      name: '153',
      classify: '213',
      mark: 153,
      people: 'wad',
      time: 4156151,
    },
  ]


  return (
    <div className={style.paperLibrary}>
      <div className={style.search}>
        <div className={style.searchInp}>
          <Form.Item
            className={style.papername}
            name="paper-name" 
            label="试卷名称" 
          >
            <Input placeholder='请输入试卷名称' />
          </Form.Item>
          <Form.Item
            className={style.people}
            name="people" 
            label="创建人" 

          >
            <Select
              placeholder="创建人"
              // onChange={handleChange}
              // options={options}
            />
          </Form.Item>
          <Form.Item
            className={style.classify}
            name="classify" 
            label="考试科目" 
          >
            <Select
              placeholder="考试科目"
              // onChange={handleChange}
              // options={options}
            />
          </Form.Item>
        </div>
        <div className={style.btns}>
          <Button>重置</Button>
          <Button>查询</Button>
        </div>
      </div>
      <div className={style.main}>
        <Table 
          dataSource={dataSource}  
          columns={columns} 
          pagination={{
            current: 1,
            pageSize: 10,
            pageSizeOptions: [10,20,30,50],
            total,
            showTotal: (total) => `共${total}条`
          }}
        />
      </div>
    </div>
  )
}

export default PaperLibrary