import { createAppAsyncThunk } from '../../../shared/lib'
import { UserUpdateProfileDto } from './types'
import { API } from './api'

export const updateProfile = createAppAsyncThunk(
  '/user/profile',
  async (data: UserUpdateProfileDto, thunkAPI) => {
    try {
      return await API.updateProfile(data)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
