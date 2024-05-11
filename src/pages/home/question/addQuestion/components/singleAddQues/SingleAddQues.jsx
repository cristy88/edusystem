import React, { useEffect, useMemo, useState } from 'react'
import style from './SingleAddQues.module.scss'
import { Modal, message, Button, Space, Col, Row } from 'antd'
import { getQuesTypeApi, getClassfiyTypeApi, createQuestionApi } from '@/api/questionMagege'
import { useNavigate } from 'react-router-dom'
import { ProForm, ProFormSelect, ProFormTextArea, ProFormRadio, ProFormText, ProFormCheckbox } from '@ant-design/pro-components'

const SingleAddQues = () => {
  const [typeQuestion, setTypeQues] = useState([])   //问题列表
  const [typeClassify, setTypeClassify] = useState([])  //科目列表
  const [QType, setQType] = useState(1)  //当前试题类型
  const [toQues, setToQues] = useState(false)  // 是否已经提交
  const [form] = ProForm.useForm()   //表单实例
  const navigate = useNavigate()

  // 获得所有题目类型
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
    } catch(e) {
      console.log('科目类别', e)
    }
  }

  // 对题目类型进行处理
  const trueQuesType = useMemo(() => {
    return typeQuestion.map(v => {
      return {
        value: v.value,
        label: v.name,
        key: v['_id']
      }
    })
  }, [typeQuestion])

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

  // 创建试题
  const createQues = async (obj) => {
    try {
      const res = await createQuestionApi(obj)
      console.log(res)
      if (res.data.code === 200 ){
        message.success('试题创建成功')
        Modal.success({
          content: '试题创建成功，可以继续创建下一题',
          onOk() {
            // console.log(form)
            form.resetFields()
          }
        })
      } else {
        message.error(res.data.msg)
      }
      setToQues(false)
    } catch (e) {
      console.log('创建试题', e)
    }
  }

  // 对提交后的数据进行处理，转变数据格式
  const handleFinish = (values) => {
    setToQues(true)
    const addRes = {}
    Object.keys(values).forEach(v => {
      if (v.includes('opt')) {
        if (!addRes['options']) addRes['options'] = []
        addRes['options'].push(values[v])
      } else if (v.includes('answer')) {
        if (values.type === 2){
          addRes['answer'] = values[v].map(op => values[`opt${op}`]).join(',')
        } else if (values.type === 1){
          addRes['answer'] = values[`opt${values[v]}`]
        } else {
          addRes['answer'] = values[v]
          if (values.type === 3) {
            addRes.options = ['对', '错']
          } else {
            addRes['options'] = [values[v]]
          }
        }
      } else {
        addRes[v] = values[v]
      }
    })
    // console.log('处理后的试题', addRes)
    createQues(addRes)
  }

  useEffect(() => {
    getQuesType()
    getClassfiyType()
  }, [])

  // 多选框的校验，至少要有两个被选中
  const validateTwoOptions = (rule, value) => {
    if (value.length < 2) {
      return Promise.reject(new Error('请至少选择两个选项'))
    }
    return Promise.resolve()
  }

  return (
    <div className={style.ques}>
      <ProForm grid={true} rowProps={{gutter: 24}}
        form={form}
        submitter={{
          render: () => (
            <Row>
              <Col offset={16} span={8}>
                <Space>
                  <Button htmlType="reset">重置</Button>
                  <Button type="primary" htmlType="submit" loading={toQues}>提交</Button>
                  <Button onClick={() => navigate('/question/item-bank')}>返回</Button>
                </Space>
              </Col>
            </Row>
          )
        }}
        onFinish={handleFinish}
      >
        <ProFormSelect
          colProps={{xl: 8, md: 12}}
          options={
            trueQuesType
          }
          placeholder="请选择题型"
          label="题型"
          name="type"
          rules={[{required: true, message: '请选择题型'}]}
          onChange={v => setQType(v)}
        />
        <ProFormSelect
          placeholder="请选择科目"
          colProps={{xl: 8, md: 12}}
          options={trueClassify}
          label="科目类型"
          name="classify"
          rules={[{ required: true, message: '请输入科目类型' }]}
        />
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="question"
          label="题目"
          rules={[{required: true, message: '请输入题目'}]}
          placeholder="请输入"
        />
        {QType === 1 && <ProFormRadio.Group
          colProps={{ span: 24 }}
          initialValue={'A'}
          name="answer1"
          label="选项"
          options={['A', 'B', 'C', 'D'].map(v => {
            return {
              value: v,
              label: <ProFormText placeholder="请输入" colProps={{md: 24}} label={v} name={`opt${v}`} rules={[{required: true, message: '选项不可为空'}]} />
            }
          })}
        />}
        {
          QType === 2 && <ProFormCheckbox.Group
            colProps={{ span: 24 }}
            name="answer2"
            label="选项"
            options={['A', 'B', 'C', 'D'].map(v => {
              return {
                value: v,
                label: <ProFormText placeholder="请输入" colProps={{md: 24}} label={v} name={`opt${v}`} rules={[{required: true, message: '选项不可为空'}]} />
              }
            })}
            rules={
              [{
                required: true,
                validator: validateTwoOptions,
                message: '请至少选中两个选项'
              }]
            }
          />
        }
        {QType === 3 && <ProFormRadio.Group 
          colProps={{ span: 24 }}
          name="answer3"
          initialValue={1}
          options={[
            {
              value: '对',
              label: '对'
            },
            {
              value: '错',
              label: '错'
            }
          ]}
        />}
        {
          QType === 4 && <ProFormText
            colProps={{xl: 12, md: 12}}
            label="正确答案"
            name="answer4"
            placeholder="请输入"
            rules={[{required: true, message: '请填写正确答案'}]}
          />
        }
        <ProFormTextArea
          placeholder="请输入"
          colProps={{ span: 16 }}
          name="desc"
          label="解析"
        />
      </ProForm>
    </div>
  )
}

export default SingleAddQues