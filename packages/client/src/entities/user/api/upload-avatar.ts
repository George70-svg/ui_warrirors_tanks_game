import { createAppAsyncThunk } from '../../../shared/lib'
import { API } from './api'

export const uploadAvatar = createAppAsyncThunk(
  '/user/profile/avatar',
  async (data: FormData, thunkAPI) => {
    try {
      return await API.uploadAvatar(data)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
