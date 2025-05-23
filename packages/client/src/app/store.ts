import {
  configureStore,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { userReducer } from '../entities/user'
import { isErrorPlainObject, messageProvider } from '../shared/lib'
import { ROUTES } from '../shared/config'
import type { RouterNavigateOptions } from '@remix-run/router/router'
import type { To } from 'react-router-dom'
import { createApiCall } from '../shared/api'
import { forumReducer } from '../entities/forum/forum-slice'

type MessageProvider = typeof messageProvider

export type ExtraArgument = {
  messageProvider: MessageProvider
  apiCall: ReturnType<typeof createApiCall>
}

export interface Router {
  navigate: (to: To, opts?: RouterNavigateOptions) => void
}

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

export function createStore(
  router: Router,
  apiCall: ExtraArgument['apiCall'],
  initialState?: unknown
) {
  return configureStore({
    reducer: {
      user: userReducer,
      forum: forumReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { messageProvider, apiCall } },
      }).concat(createErrorMiddleware(messageProvider, router)),
  })
}
export type Store = ReturnType<typeof createStore>
export type AppDispatch = ReturnType<typeof createStore>['dispatch']
