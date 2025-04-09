import { createAppAsyncThunk } from '../../../shared/lib'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const logout = createAppAsyncThunk(
  'user/logout',
  async (_, thunkApi) => {
    try {
      const config = thunkApi.extra.apiConfig
      await API.logout(config)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
