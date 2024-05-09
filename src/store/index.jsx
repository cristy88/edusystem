import { configureStore } from "@reduxjs/toolkit"
import paperReducer from "./paperInfo/paperInfo"

const store = configureStore({
  reducer: {
    paper: paperReducer
  }
})

export default store