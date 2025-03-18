import {
  configureStore,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { message } from 'antd'
import { userReducer } from '../../entities/user'
import { router } from './routing/router'
import { isErrorPlainObject } from '../../shared/lib'
import { ROUTES } from '../../shared/config'

export const extraArgument = {
  message,
}

type Message = typeof message
type Router = typeof router

const createErrorMiddleware = (
  messageSender: Message,
  router: Router
): Middleware => {
  return () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { payload } = action
      if (isErrorPlainObject(payload)) {
        const { reason, message, statusCode } = payload
        const messageToSend = reason || message
        if (statusCode && statusCode >= 500) {
          router.navigate(ROUTES.SERVER_ERROR, {
            state: { message: messageToSend, title: statusCode },
          })
        } else {
          messageSender.error(messageToSend)
        }
      }
    }
    return next(action)
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(
      createErrorMiddleware(message, router)
    ),
})
