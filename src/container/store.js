import { configureStore } from '@reduxjs/toolkit'
import userData from "./Reducer";

export default configureStore({
  reducer: userData
})