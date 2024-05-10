import React, { useEffect, useMemo, useRef, useState } from 'react'
import style from './SingleAddQues.module.scss'
import { Form, Select, Input, Radio, message, Checkbox, Button, Space, Col, Row } from 'antd'
import { getQuesTypeApi, getClassfiyTypeApi } from '@/api/questionMagege'
import { useNavigate } from 'react-router-dom'
const { TextArea } = Input

const SingleAddQues = () => {
  const [typeQuestion, setTypeQues] = useState([])
  const [typeClassify, setTypeClassify] = useState([])
  const navigate = useNavigate()

  const getQuesType = async () => {
    try {
      const res = await getQuesTypeApi()
      // console.log('所有试题类型', res)
      if (res.data.code === 200) {
        setTypeQues(res.data.data.list)
      } else {
        message.error(res.data.msg)
      }
    } catch (e) {
      console.log('所有试题类型', e)
    }
  }

  const getClassfiyType = async () => {
    try {
      const res = await getClassfiyTypeApi()
      // console.log('科目类别', res.data.data.list)
      if (res.data.code === 200) {
        setTypeClassify(res.data.data.list)
      } else {
        message.error(res.data.msg)
      }
    } catch(e) {
      console.log('科目类别', e)
    }
  }

  // 对科目数据进行去重
  const trueClassify = useMemo(() => {
    const trueC = []
    typeClassify.forEach(v => {
      if (!trueC.find(x => x.name === v.name)) {
        trueC.push(v)
      }
    })
    return trueC
  }, [typeClassify])

  const handleFinish = (values) => {
    console.log('创建试题', values)
  }

  const quesChange = () => {
    console.log('类型改变了')
  }

  useEffect(() => {
    getQuesType()
    getClassfiyType()
  }, [])

  return (
    <div className={style.ques}>
      <Form layout="vertical" onFinish={handleFinish}>
        <Row>
          <Col span={10}>
            <Form.Item
              label="题型"
              name="type"
              rules={[
                {required: true, message: '请选择题型'}
              ]}
            >
              <Select onChange={quesChange} allowClear>
                {typeQuestion.map(v => (
                  <Select.Option value={v.value} key={v['_id']}>{ v.name }</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={10} offset={1}>
            <Form.Item
              label="科目类型"
              name="classify"
              rules={[
                {required: true, message: '请输入科目类型'}
              ]}
            >
              <Select allowClear>
                {trueClassify.map(v => (
                  <Select.Option value={v.value} key={v['_id']}> {v.name} </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="题目" name="question" rules={[{
          required: true, message: '请输入题目'
        }]}>
          <TextArea></TextArea>
        </Form.Item>
        <Row>
          <Col span={22}>
            <Form.Item name="answer" label="选项">
              <Radio.Group name='radioGroup' className={style.answer}>
                {['A','B','C','D'].map((v, ind) => <div key={v}>
                  <Radio value={ind}>
                    <Form.Item name={`opt${ind}`} label={v} rules={
                      [{
                        required: true, message: '选项不可为空'
                      }]}
                    >
                      <Input allowClear />
                    </Form.Item>
                  </Radio>
                </div>)}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="解析" name="desc">
          <TextArea></TextArea>
        </Form.Item>
        <Row>
          <Col offset={16} span={8}>
            <Form.Item>
              <Space>
                <Button htmlType="reset">重置</Button>
                <Button type="primary" htmlType="submit">提交</Button>
                <Button onClick={() => navigate('/question/item-bank')}>返回</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SingleAddQues