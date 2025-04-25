import { createAppAsyncThunk } from '../../../shared/lib'
import { apiParams } from './api'
import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'
import { CommentDto, ReactionForm } from './types'

export const addReaction = createAppAsyncThunk(
  'forum/comment/reaction',
  async (data: ReactionForm, thunkApi) => {
    try {
      const requestData = apiParams.addReaction(data)
      return await thunkApi.extra.apiCall<CommentDto>(requestData)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
