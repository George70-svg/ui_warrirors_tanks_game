import { createAppAsyncThunk } from '../../../shared/lib'
import { UserUpdatePasswordDto } from './types'
import { apiParams } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const updatePassword = createAppAsyncThunk(
  '/user/password',
  async (data: UserUpdatePasswordDto, thunkApi) => {
    try {
      const requestData = apiParams.updatePassword(data)
      const result = await thunkApi.extra.apiCall(requestData)
      thunkApi.extra.messageProvider.success(
        'User password has been successfully updated.'
      )
      return result
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
