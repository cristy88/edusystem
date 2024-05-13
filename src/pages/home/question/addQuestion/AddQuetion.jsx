import React, { useEffect, useMemo, useState } from 'react'
import { Tabs, message } from 'antd'
import * as XLSX from 'xlsx'
import { createQuesMultApi, getQuesTypeApi, getClassfiyTypeApi } from '@/api/questionMagege'
import SingleAddQues from './components/singleAddQues/SingleAddQues'
import TestUpdate from './components/testUpdate/TestUpdate'
import {
  ProForm,
  ProFormUploadDragger
} from '@ant-design/pro-components'


const AllPush = () => {
  const [form] = ProForm.useForm()
  const [num, setNum] = useState(0)
  const [tn, setTn] = useState(-1)
  const [trueAllQues, setTrueAllQues] = useState({list: []})

  // 批量上传问题
  const createAllQues = async (data) => {
    const res = await createQuesMultApi(data)
    // console.log('res上传', res)
    if (res.data.code === 200) {
      setNum(num => num + 1)
    }
  }

  // 对上传的文件进行处理
  const handleUpdate = (originfile) => {
    let resData = []
    // 读取文件
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(originfile)
    fileReader.onload = e => {
      try {
        const result = e.target.result
        // console.log('result', result)
        const formdata = new FormData()
        formdata.append('file', result)
        // console.log('formdata', formdata)
        const workbook = XLSX.read(result, {type: 'binary'})
        // console.log('workbook', workbook)
        workbook.SheetNames.forEach(v => {
          resData.push(XLSX.utils.sheet_to_json(workbook.Sheets[v]))
        }) 
        console.log('resData1111111111', resData)
        const trueData = {list: []}
        resData.forEach(arr => {
          arr.forEach(v => {
            if (v.type === 4) {
              v.options = [v.options + '']
            } else {
              // console.log(v)
              v.options = v.options.split(',')
            }
            Object.keys(v).map(k => {
              if (k !== 'options') {
                v[k] = v[k] + ''
              }
            })
            trueData.list.push(v)
          })
        })
        console.log('处理后的数据', trueData)
        // 批量上传试卷
        // createAllQues(trueData)
        setNum(num => num + 1)
        console.log('trueAllQues', trueAllQues)
        // setTrueAllQues(trueAllQues => trueAllQues.list.concat(trueData))
        // upload(resData)
      } catch(e) {
        console.log('上传文件错误', e)
      }
    }
  }

  // 点击上传
  const handleSubmit = async (value) => {
    console.log(value)
    setTn(value.dragXlsx.length)
    setNum(0)
    value.dragXlsx.forEach(v => {
      handleUpdate(v.originFileObj)
    })
  }

  const previewFile = (file) => {
    console.log('文件预览逻辑', file)
  }

  useEffect(() => {
    // console.log('num, td', num, tn)
    if (num === tn) {
      // console.log('上传成功')
      // message.success('文件上传成功')
      // form.resetFields()
      console.log('打入获取过的数据')
      setTn(-1)
      setNum(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, tn])

  useEffect(() => {
    console.log(trueAllQues)
  }, [trueAllQues])

  return (
    <div style={{padding: '20px', background: 'white', margin: '10px 0'}}>
      <ProForm onFinish={handleSubmit} form={form}>
        <ProFormUploadDragger
          name="dragXlsx"
          label="上传excel批量导入"
          rules={[{required: true}]}
          multiple={true}
        />
      </ProForm>
    </div>
  )
}

const AddQuetion = () => {
  const [typeQuestion, setTypeQues] = useState([])   //题目类型列表
  const [typeClassify, setTypeClassify] = useState([])  //科目列表

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

  useEffect(() => {
    getQuesType()
    getClassfiyType()
  })

  return (
    <div style={{padding: '10px 20px 0'}}>
      <Tabs
        defaultActiveKey='1'
        type="card"
        size="middle"
        style={{marginBottom: 32}}
        items={[
          {
            label: '手动添加',
            key: '1',
            children: <SingleAddQues trueQuesType={trueQuesType} trueClassify={trueClassify} />
          },
          {
            label: '批量导入',
            key: '0',
            children: <AllPush />
          },
          {
            label: '测试批量导入',
            key: '2',
            children: <TestUpdate trueQuesType={trueQuesType} trueClassify={trueClassify} />
          }
        ]}
      ></Tabs>
    </div>
  )
}

export default AddQuetion