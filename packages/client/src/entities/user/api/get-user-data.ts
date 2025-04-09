import { selectIsUserAuthStatusIdle } from '../user-slice'
import { createAppAsyncThunk } from '../../../shared/lib'
import { API } from './api'

export const getUserData = createAppAsyncThunk(
  'user/auth',
  async (_, thunkApi) => {
    try {
      const config = thunkApi.extra.apiConfig
      return await API.getUserData(config)
    } catch {
      return null
    }
  },
  {
    condition: (_, { getState }) => selectIsUserAuthStatusIdle(getState()),
  }
)
