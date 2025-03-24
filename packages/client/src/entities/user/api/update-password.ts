import { createAppAsyncThunk } from '../../../shared/lib'
import { UserUpdatePasswordDto } from './types'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const updatePassword = createAppAsyncThunk(
  '/user/password',
  async (data: UserUpdatePasswordDto, thunkAPI) => {
    try {
      await API.updatePassword(data)
      thunkAPI.extra.messageProvider.success(
        'User password has been successfully updated.'
      )
    } catch (e) {
      return thunkAPI.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
