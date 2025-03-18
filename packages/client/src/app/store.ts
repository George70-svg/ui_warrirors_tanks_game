import { configureStore } from '@reduxjs/toolkit'
import { message } from 'antd'
import { userReducer } from '../entities/user'

export const extraArgument = {
  message,
}

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
})
