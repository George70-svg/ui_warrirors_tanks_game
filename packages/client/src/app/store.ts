import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '../entities/user'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

//   ,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: { extraArgument } }),
// }

// const extraArgument = {
//   router,
// }
