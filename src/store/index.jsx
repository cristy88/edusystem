import { configureStore } from "@reduxjs/toolkit"
import userStore from './modules/user'

const store = configureStore({
  reducer: {
    user: userStore
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    //关闭redux序列化检测
    serializableCheck: false
  })
})

export default store