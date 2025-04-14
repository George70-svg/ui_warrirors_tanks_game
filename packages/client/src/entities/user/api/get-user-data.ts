import { selectIsUserAuthStatusIdle } from '../user-slice'
import { createAppAsyncThunk } from '../../../shared/lib'
import { apiParams } from './api'
import { UserInfoDto } from './types'

export const getUserData = createAppAsyncThunk(
  'user/auth',
  async (_, thunkApi) => {
    try {
      const requestData = apiParams.getUserData
      return await thunkApi.extra.apiCall<UserInfoDto>(requestData)
    } catch {
      return null
    }
  },
  {
    condition: (_, { getState }) => selectIsUserAuthStatusIdle(getState()),
  }
)
