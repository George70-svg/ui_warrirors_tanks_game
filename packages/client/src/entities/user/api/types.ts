export type UserSignUpDto = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}
export type UserSignInDto = Pick<UserSignUpDto, 'password' | 'login'>

export type OauthYaParams = {
  code: string
  redirect_uri: string
}

export type OauthYaServiceParams = {
  redirect_uri: string
}

export type OauthServiceDTO = {
  service_id: string
}

export type UserInfoDto = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  email: string
  phone: string
}

export type UserUpdateProfileDto = {
  display_name: string
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
}

export type UserUpdatePasswordDto = {
  oldPassword: string
  newPassword: string
}
