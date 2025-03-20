import { createAppAsyncThunk } from '../../../shared/lib'
import { UserSignUpDto } from './types'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const signUp = createAppAsyncThunk(
  'user/sign-up',
  async (data: UserSignUpDto, thunkAPI) => {
    try {
      await API.signUp(data)
      return await API.getUserData()
    } catch (e) {
      return thunkAPI.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
