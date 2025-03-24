import { apiCall } from '../../../shared/api'
import {
  UserInfoDto,
  UserSignInDto,
  UserSignUpDto,
  UserUpdatePasswordDto,
  UserUpdateProfileDto,
} from './types'

export const API = {
  getUserData: () =>
    apiCall<UserInfoDto>({
      url: '/auth/user',
    }),
  logout: () =>
    apiCall({
      url: '/auth/logout',
      method: 'POST',
    }),
  signIn: (data: UserSignInDto) =>
    apiCall({
      url: '/auth/signin',
      data,
      method: 'POST',
    }),
  signUp: (data: UserSignUpDto) =>
    apiCall({
      url: '/auth/signup',
      data,
      method: 'POST',
    }),
  updatePassword: (data: UserUpdatePasswordDto) =>
    apiCall({
      url: '/user/password',
      data,
      method: 'PUT',
    }),
  updateProfile: (data: UserUpdateProfileDto) =>
    apiCall<UserInfoDto>({
      url: '/user/profile',
      data,
      method: 'PUT',
    }),
  uploadAvatar: (data: FormData) =>
    apiCall<UserInfoDto>({
      url: '/user/profile/avatar',
      data,
      method: 'PUT',
    }),
}
