import { createAppAsyncThunk } from '../../../shared/lib'
import { apiParams } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const logout = createAppAsyncThunk(
  'user/logout',
  async (_, thunkApi) => {
    try {
      const requestData = apiParams.logout
      await thunkApi.extra.apiCall(requestData)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
