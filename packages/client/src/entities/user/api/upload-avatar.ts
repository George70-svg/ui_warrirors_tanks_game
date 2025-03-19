import { createAppAsyncThunk } from '../../../shared/lib'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const uploadAvatar = createAppAsyncThunk(
  '/user/profile/avatar',
  async (data: FormData, thunkAPI) => {
    try {
      const result = await API.uploadAvatar(data)
      thunkAPI.extra.messageProvider.success(
        "The user's avatar has been successfully updated."
      )
      return result
    } catch (e) {
      return thunkAPI.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
