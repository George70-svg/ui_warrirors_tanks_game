import { createAppAsyncThunk } from '../../../shared/lib'
import { UserInfoDto, UserUpdateProfileDto } from './types'
import { apiParams } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const updateProfile = createAppAsyncThunk(
  '/user/profile',
  async (data: UserUpdateProfileDto, thunkApi) => {
    try {
      const requestData = apiParams.updateProfile(data)
      const result = await thunkApi.extra.apiCall<UserInfoDto>(requestData)
      thunkApi.extra.messageProvider.success(
        'User data has been successfully updated.'
      )
      return result
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
