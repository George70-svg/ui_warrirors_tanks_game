import { Input, FormRule } from 'antd'
import {
  IdcardOutlined,
  MailOutlined,
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import { FC } from 'react'
import { VALIDATIONS } from './validations'

const { Password } = Input

export type InputName =
  | 'display_name'
  | 'email'
  | 'first_name'
  | 'login'
  | 'password'
  | 'phone'
  | 'second_name'
  | 'oldPassword'
  | 'newPassword'

type FieldConfig = {
  [key in InputName]: {
    Component: typeof Input | typeof Password
    text: string
    Icon: FC
    rules?: FormRule[]
  }
}

export const FIELD_CONFIG: FieldConfig = {
  display_name: {
    Component: Input,
    text: 'Nickname',
    Icon: IdcardOutlined,
  },
  email: {
    Component: Input,
    text: 'Email',
    Icon: MailOutlined,
    rules: VALIDATIONS.email,
  },
  first_name: {
    Component: Input,
    text: 'First name',
    Icon: UserOutlined,
    rules: VALIDATIONS.name,
  },
  login: {
    Component: Input,
    text: 'Login',
    Icon: UserOutlined,
    rules: VALIDATIONS.login,
  },
  newPassword: {
    Component: Password,
    text: 'New password',
    Icon: LockOutlined,
    rules: VALIDATIONS.password,
  },
  oldPassword: {
    Component: Password,
    text: 'Old password',
    Icon: LockOutlined,
    rules: VALIDATIONS.password,
  },
  password: {
    Component: Password,
    text: 'Password',
    Icon: LockOutlined,
    rules: VALIDATIONS.password,
  },
  phone: {
    Component: Input,
    text: 'Phone',
    Icon: PhoneOutlined,
    rules: VALIDATIONS.phone,
  },
  second_name: {
    Component: Input,
    text: 'Second name',
    Icon: UserOutlined,
    rules: VALIDATIONS.name,
  },
}
