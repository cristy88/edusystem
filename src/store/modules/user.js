import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPersonInfoApi, getLeftMeauApi } from '@/api'
import { formatMenu, baseMenu} from '@/utils/menu'

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const res = await getPersonInfoApi()
  return res
})

export const getMenu = createAsyncThunk('user/getMenu', async () => {
  const res = await getLeftMeauApi()
  // console.log('左侧菜单', res)
  return res
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: true,
    userInfo: null,
    menuList: []
  },
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getUserInfo.pending, state => {
        state.loading = true
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload.data.data
      })
      .addCase(getMenu.fulfilled, (state, { payload }) => {
        state.menuList = payload.data.data.list
      })
  }
})

export const selectMenu = (state) => {
  return baseMenu.concat(formatMenu(state.user.menuList))
}

export default userSlice.reducer