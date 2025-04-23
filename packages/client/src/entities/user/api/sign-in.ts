import { createAppAsyncThunk } from '../../../shared/lib'
import { UserInfoDto, UserSignInDto } from './types'
import { apiParams } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const signIn = createAppAsyncThunk(
  'user/sign-in',
  async (data: UserSignInDto, thunkApi) => {
    try {
      const requestUserData = apiParams.getUserData
      const requestSignUpData = apiParams.signIn(data)
      await thunkApi.extra.apiCall(requestSignUpData)
      return await thunkApi.extra.apiCall<UserInfoDto>(requestUserData)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
