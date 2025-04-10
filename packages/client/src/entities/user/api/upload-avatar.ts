import { createAppAsyncThunk } from '../../../shared/lib'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const uploadAvatar = createAppAsyncThunk(
  '/user/profile/avatar',
  async (data: FormData, thunkApi) => {
    try {
      const config = thunkApi.extra.apiConfig
      const result = await API.uploadAvatar(data, config)
      thunkApi.extra.messageProvider.success(
        "The user's avatar has been successfully updated."
      )
      return result
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
