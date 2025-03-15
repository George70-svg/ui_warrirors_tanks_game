import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from '@ant-design/icons'
import { AuthForm, AuthLayout, FormField } from '../../shared/ui'
import { ROUTES } from '../../shared/config'
import { AuthFormFooterLink } from '../../shared/ui/auth-form/auth-form-footer-link'

const signUpFields: FormField[] = [
  {
    name: 'firstName',
    placeholder: 'Имя',
    prefix: <UserOutlined />,
  },
  {
    name: 'lastName',
    placeholder: 'Фамилия',
    prefix: <IdcardOutlined />,
  },
  {
    name: 'login',
    placeholder: 'Логин',
    prefix: <UserOutlined />,
  },
  {
    name: 'email',
    placeholder: 'Email',
    prefix: <MailOutlined />,
    type: 'email',
  },
  {
    name: 'password',
    placeholder: 'Пароль',
    prefix: <LockOutlined />,
    type: 'password',
  },
  {
    name: 'phone',
    placeholder: 'Телефон',
    prefix: <PhoneOutlined />,
    type: 'tel',
  },
]

export function SignUpPage(): React.ReactElement {
  const footer = (
    <div>
      Уже есть аккаунт?{' '}
      <AuthFormFooterLink link={ROUTES.SIGN_IN} text="Войти" />
    </div>
  )

  return (
    <AuthLayout>
      <AuthForm
        title="Регистрация"
        fields={signUpFields}
        submitButtonText="Зарегистрироваться"
        footer={footer}
      />
    </AuthLayout>
  )
}
