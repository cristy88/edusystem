/* eslint-disable react/prop-types */
import React from 'react' 
import { Button, Form, Input,  Space, Select,DatePicker } from 'antd'
import style from "./searchForm.module.scss"

const {RangePicker} = DatePicker

const SearchForm = ({
  filterList,
  onSearch,
  onReset
}) => {
  const [form] = Form.useForm()

  
  const onFinish = params => {
    const res = {}
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== '') {
        res[key] = val
      }
    })
    onSearch(res)
  }
  const renderItem = (item) => {
    if (item.type === 'select') {
      return <Select placeholder={item.placeholder} options={item.options} {...item.props} /> 
    } else if (item.type === 'date') {
      return <RangePicker {...item.props} />
    } else {
      return <Input placeholder={item.placeholder} /> 
    }
  }
    
  return (
    <div>
      <div className={style.search}>
        <Form 
          form={form} 
          labelCol={{ span: 6 }} 
          wrapperCol={{ span: 20}} 
          onFinish={onFinish}
          className={style.form}
        >
          {filterList.map(item=>
            <Form.Item className={style.formItem} key={item.label} label={item.label} name={item.name}>
              {renderItem(item)}
              {/* <Input placeholder={item.placeholder} /> */}
            </Form.Item>
          )}

          <Form.Item className={style.formItem}>
            <Space>
              <Button type="primary" onClick={form.submit}>搜索</Button>
              <Button type="primary" ghost onClick={()=>{
                form.resetFields()
                onReset({})
              }} >重置</Button>
            </Space>
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}

export default SearchForm
