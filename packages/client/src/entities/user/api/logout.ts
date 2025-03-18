import { createAppAsyncThunk } from '../../../shared/lib'
import { API } from './api'

export const logout = createAppAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await API.logout()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
