import { apiCall } from '../../../shared/api'
import {
  UserInfoDto,
  UserSignInDto,
  UserSignUpDto,
  UserUpdatePasswordDto,
  UserUpdateProfileDto,
} from './types'
import { ApiConfig } from '../../../shared/api/api-config'

export const API = {
  getUserData: (apiConfig: ApiConfig) =>
    apiCall<UserInfoDto>({ url: '/auth/user' }, apiConfig),
  logout: (apiConfig: ApiConfig) =>
    apiCall({ url: '/auth/logout', method: 'POST' }, apiConfig),
  signIn: (data: UserSignInDto, apiConfig: ApiConfig) =>
    apiCall({ url: '/auth/signin', data, method: 'POST' }, apiConfig),
  signUp: (data: UserSignUpDto, apiConfig: ApiConfig) =>
    apiCall({ url: '/auth/signup', data, method: 'POST' }, apiConfig),
  updatePassword: (data: UserUpdatePasswordDto) =>
    apiCall({ url: '/user/password', data, method: 'PUT' }),
  updateProfile: (data: UserUpdateProfileDto) =>
    apiCall<UserInfoDto>({ url: '/user/profile', data, method: 'PUT' }),
  uploadAvatar: (data: FormData) =>
    apiCall<UserInfoDto>({ url: '/user/profile/avatar', data, method: 'PUT' }),
}
