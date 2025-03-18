import { createAppAsyncThunk } from '../../../shared/lib'
import { UserSignInDto } from './types'
import { API } from './api'

export const signIn = createAppAsyncThunk(
  'user/sign-in',
  async (data: UserSignInDto, thunkAPI) => {
    try {
      await API.signIn(data)
      return await API.getUserData()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
