import { createAppAsyncThunk } from '../../../shared/lib'
import { UserUpdateProfileDto } from './types'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const updateProfile = createAppAsyncThunk(
  '/user/profile',
  async (data: UserUpdateProfileDto, thunkApi) => {
    try {
      const config = thunkApi.extra.apiConfig
      const result = await API.updateProfile(data, config)
      thunkApi.extra.messageProvider.success(
        'User data has been successfully updated.'
      )
      return result
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
