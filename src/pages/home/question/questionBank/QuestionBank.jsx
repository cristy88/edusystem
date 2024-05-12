import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './questionBank.module.scss'
import { Button, message } from 'antd'
import { getQuesListApi, getClassfiyTypeApi } from '@/api/questionMagege'

const QuestionBank = () => {
  const navigate = useNavigate()
  const [pageObj, setPageObj] = useState({page: 1,pagesize: 10})
  const [searObj, setSearObj] = useState({})
  const [total, setTotal] = useState(0)
  const [totalPage, setTotalP] = useState(0)
  const [queslist, setQuesList] = useState([])
  const [tableL, setTableL] = useState(false)
  const [typeClassify, setTypeClassify] = useState([])  //科目列表
  const columns = useRef([])

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

  // 获取所有试题列表
  const getQuesAll = async () => {
    try {
      const res = await getQuesListApi(pageObj, searObj)
      console.log('res', res)
      if(res.data.code === 200) {
        setQuesList(res.data.data.list)
        setTotal(res.data.data.total)
        setTotalP(res.data.data.totalPage)
        setTableL(false)
      } else {
        message.error(res.data.msg)
      }
    } catch(e) {
      console.log('试题列表', e)
    }
  }

  useEffect(() => {
    getQuesAll()
    getClassfiyType()
    columns.current = [
      {
        title: "试题列表",
        dataIndex: "question",
        editable: true
      },
      {
        title: "分类",
        dataIndex: "type",
        editable: true
      },
      {
        title: "题型",
        dataIndex: "classify",
        editable: true
      }
    ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={style.box}>
      <Button type="primary" onClick={() => navigate('/question/create-item')}>添加试题</Button>
      <div className={style.search}>

      </div>
      <div className={style.queslist}>

      </div>
    </div>
  )
}

export default QuestionBank