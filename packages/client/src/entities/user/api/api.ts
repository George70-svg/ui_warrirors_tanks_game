import {
  UserSignInDto,
  UserSignUpDto,
  UserUpdatePasswordDto,
  UserUpdateProfileDto,
  OauthYaParams,
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
  oauthYaGetServiceId: (): ConfigFacade => ({
    url: 'oauth/yandex/service-id',
    data: {
      redirect_uri: `https://${__HOST__}:${__PORT__}`,
    },
    method: 'GET',
  }),
  oauthYa: (data: OauthYaParams): ConfigFacade => ({
    url: 'oauth/yandex',
    data,
    method: 'POST',
  }),
}
