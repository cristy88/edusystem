import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { paperDetailApi } from "../../api"

export const getPaperInfo = createAsyncThunk('/exam/detail', async () =>{
  const res = await paperDetailApi()
  return res.data
})

const paperSlice = createSlice({
  name: 'paper',
  initialState: {
    name: '',
    createTime: '',
    id: ''
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getPaperInfo.fulfilled, ( state , action)=>{
        const {name,createTime,id} = action.payload.values
        state.name = name
        state.createTime = createTime
        state.id = id
      })
      .addCase(getPaperInfo.rejected,(state,action) => {
        console.log('失败',action)
      })
  }
})

export default paperSlice.reducer