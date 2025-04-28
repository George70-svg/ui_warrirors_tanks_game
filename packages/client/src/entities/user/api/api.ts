import {
  UserSignInDto,
  UserSignUpDto,
  UserUpdatePasswordDto,
  UserUpdateProfileDto,
  UserSignInOauthYaParams,
  OauthYaServiceParams,
} from './types'
import { ConfigFacade } from '../../../shared/api'

export const apiParams = {
  getUserData: { url: '/auth/user' } as ConfigFacade,
  logout: { url: '/auth/logout', method: 'POST' } as ConfigFacade,
  signIn: (data: UserSignInDto): ConfigFacade => ({
    url: '/auth/signin',
    data,
    method: 'POST',
  }),
  signUp: (data: UserSignUpDto): ConfigFacade => ({
    url: '/auth/signup',
    data,
    method: 'POST',
  }),
  updatePassword: (data: UserUpdatePasswordDto): ConfigFacade => ({
    url: '/user/password',
    data,
    method: 'PUT',
  }),
  updateProfile: (data: UserUpdateProfileDto): ConfigFacade => ({
    url: '/user/profile',
    data,
    method: 'PUT',
  }),
  uploadAvatar: (data: FormData): ConfigFacade => ({
    url: '/user/profile/avatar',
    data,
    method: 'PUT',
  }),
  oauthYaGetServiceId: (data: OauthYaServiceParams): ConfigFacade => ({
    url: 'oauth/yandex/service-id',
    data,
    method: 'GET',
  }),
  oauthYa: (data: UserSignInOauthYaParams): ConfigFacade => ({
    url: 'oauth/yandex',
    data,
    method: 'POST',
  }),
}
