import { createAppAsyncThunk } from '../../../shared/lib'
import { UserUpdateProfileDto } from './types'
import { API } from './api'

export const updateProfile = createAppAsyncThunk(
  '/user/profile',
  async (data: UserUpdateProfileDto, thunkAPI) => {
    try {
      const result = await API.updateProfile(data)
      thunkAPI.extra.messageProvider.success(
        'User data has been successfully updated.'
      )
      return result
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
