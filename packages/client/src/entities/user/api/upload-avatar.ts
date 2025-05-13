import { createAppAsyncThunk } from '../../../shared/lib'
import { apiParams } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'
import { UserInfoDto } from './types'

export const uploadAvatar = createAppAsyncThunk(
  '/user/profile/avatar',
  async (data: FormData, thunkApi) => {
    try {
      const requestData = apiParams.uploadAvatar(data)
      const result = await thunkApi.extra.apiCall<UserInfoDto>(requestData)
      thunkApi.extra.messageProvider.success(
        "The user's avatar has been successfully updated."
      )
      return result
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
