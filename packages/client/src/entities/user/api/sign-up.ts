import { createAppAsyncThunk } from '../../../shared/lib'
import { UserSignUpDto } from './types'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const signUp = createAppAsyncThunk(
  'user/sign-up',
  async (data: UserSignUpDto, thunkApi) => {
    try {
      const config = thunkApi.extra.apiConfig
      await API.signUp(data, config)
      return await API.getUserData(config)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
