import { createSlice } from "@reduxjs/toolkit"

const paperSlice = createSlice({
  name: 'paper',
  initialState: {
    papername: '',
    people: '',
    classify: ''
  },
  reducers: {

  }
})

export default paperSlice.reducer