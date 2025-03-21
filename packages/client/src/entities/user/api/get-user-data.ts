import { selectIsUserAuthStatusIdle } from '../user-slice'
import { createAppAsyncThunk } from '../../../shared/lib'
import { API } from './api'

export const getUserData = createAppAsyncThunk(
  'user/auth',
  async () => {
    try {
      return await API.getUserData()
    } catch {
      return null
    }
  },
  {
    condition: (_, { getState }) => selectIsUserAuthStatusIdle(getState()),
  }
)
