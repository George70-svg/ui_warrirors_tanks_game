import {
  configureStore,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { userReducer } from '../entities/user'
import { router } from './ui/routing/router'
import { isErrorPlainObject, messageProvider } from '../shared/lib'
import { ROUTES } from '../shared/config'

export const extraArgument = {
  messageProvider,
}

type Router = typeof router
type MessageProvider = typeof messageProvider

const createErrorMiddleware = (
  messageProvider: MessageProvider,
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
          messageProvider.error(messageToSend)
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
      createErrorMiddleware(messageProvider, router)
    ),
})
