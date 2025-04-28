import { convertApiErrorToPlainObjectOrNull } from '../../../shared/api'
import { createAppAsyncThunk } from '../../../shared/lib'
import { apiParams } from './api'
import { OauthServiceDTO, UserInfoDto, OauthYaParams } from './types'

export const oauthYaServiceId = createAppAsyncThunk(
  'user/oauth-ya-service-id',
  async (_, thunkApi) => {
    try {
      const requestOauthYaClientId = apiParams.oauthYaGetServiceId()
      return await thunkApi.extra.apiCall<OauthServiceDTO>(
        requestOauthYaClientId
      )
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)

export const oauthYa = createAppAsyncThunk(
  'user/oauth-ya',
  async (data: OauthYaParams, thunkApi) => {
    try {
      const requestOauthYa = apiParams.oauthYa(data)
      await thunkApi.extra.apiCall(requestOauthYa)

      const requestUserData = apiParams.getUserData
      return await thunkApi.extra.apiCall<UserInfoDto>(requestUserData)
    } catch (e) {
      return thunkApi.rejectWithValue(convertApiErrorToPlainObjectOrNull(e))
    }
  }
)
