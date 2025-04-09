import { createAppAsyncThunk } from '../../../shared/lib'
import { UserSignInDto } from './types'
import { API } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const signIn = createAppAsyncThunk(
  'user/sign-in',
  async (data: UserSignInDto, thunkApi) => {
    try {
      const config = thunkApi.extra.apiConfig
      await API.signIn(data, config)
      return await API.getUserData(config)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
