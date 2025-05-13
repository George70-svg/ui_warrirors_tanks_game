import { createAppAsyncThunk } from '../../../shared/lib'
import { UserInfoDto, UserSignUpDto } from './types'
import { apiParams } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const signUp = createAppAsyncThunk(
  'user/sign-up',
  async (data: UserSignUpDto, thunkApi) => {
    try {
      const requestUserData = apiParams.getUserData
      const requestSignUpData = apiParams.signUp(data)
      await thunkApi.extra.apiCall(requestSignUpData)
      return await thunkApi.extra.apiCall<UserInfoDto>(requestUserData)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
