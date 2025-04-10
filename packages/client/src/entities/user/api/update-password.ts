import { createAppAsyncThunk } from '../../../shared/lib'
import { UserUpdatePasswordDto } from './types'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const updatePassword = createAppAsyncThunk(
  '/user/password',
  async (data: UserUpdatePasswordDto, thunkApi) => {
    try {
      const config = thunkApi.extra.apiConfig
      await API.updatePassword(data, config)
      thunkApi.extra.messageProvider.success(
        'User password has been successfully updated.'
      )
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
