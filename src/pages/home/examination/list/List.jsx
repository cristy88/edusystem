import React, { useEffect, useState } from 'react'
import { getExaninationListApi } from '../../../../api'

const List = () => {
  const [list, setList] = useState([])
  const getExamination = async () => {
    const res = await getExaninationListApi()
    if(res.status === 200) {
      setList(res.data.data.list)
    }
  }
  useEffect(() => {
    getExamination()
  }, [])

  console.log(list)
  return (
    <div>
      {list.map(item => 
        <div key={item._id}>
          {item.group}
          {item.name}
          {item.examiner}
          {item.classify}
        </div>
      )}
    </div>
  )
}

export default List