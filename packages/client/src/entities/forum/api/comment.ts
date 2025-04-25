import { createAppAsyncThunk } from '../../../shared/lib'
import { apiParams } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'

export const addReaction = createAppAsyncThunk(
  'forum/comment/reaction',
  async (_, thunkApi) => {
    try {
      const requestData = apiParams.addReaction
      await thunkApi.extra.apiCall(requestData)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
